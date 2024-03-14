import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";
import Input, { Label } from "../components/Input";
import Editor from "../components/Editor";
import { Badge, Button } from "../components/GlobalStyles";
import SelectDetail from "../components/SelectCustom";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import Avatar, { AvatarGroup } from "../components/Avatar";
import Radio from "../components/Radio";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fetchProject } from "../store/project.slice";
import { clearUser } from "../store/projectUser.slice";
import Loading from "../components/Loading";

const Popup = styled.div`
  overflow: visible;
  left: inherit;
  right: 0;
  top: 0;
  box-shadow: 0 0.31rem 1.25rem 0 rgba(75, 70, 92, 0.4);
  height: 100vh;
  overflow: auto;
  min-width: 26.5rem;
  > div {
    display: grid;
    gap: 1rem;
  }
  &::backdrop {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
  }
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    width: 0.5rem;
    background-color: var(--darkLabel);
    border-radius: 1rem;
  }
`;
const Close = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  background-color: #fff;
  opacity: 1;
  font-size: 0;
  padding: 0.2rem;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  transition: all 0.23s ease 0.1s;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--secondary);
  }
`;
const PopupHeader = styled.div`
  padding: 1.5rem;
`;
const PopupContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;

const WorkRead = ({ id, isData, ...props }) => {
  const { isAdmin } = useSelector((state) => state.userSlice);
  const { users } = useSelector((state) => state.projectUserSlice);
  const [isModify, setIsModify] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [dateError, setDateError] = useState(false);
  const dispatch = useDispatch();
  const { allProjectInfo } = useSelector((state) => state.projectSlice);
  const PopoverRef = useRef(null);
  const [isColor, setIsColor] = useState("진행중", "success");
  const [isLoading, setIsLoading] = useState(false);

  const { title, startDay, endDay, projectMembers, description, ingState, isClass, publicId, backgroundColor, textColor } = isData;

  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      title: title,
      start: startDay,
      end: endDay,
      description: description,
      color: backgroundColor,
      textColor: textColor,
      ing: ingState,
      badgeClass: isClass,
    }));
  }, [isData]);

  // if (color === "#dff7e9") {
  //   setIsColor("진행중", "success");
  // } else if (color === "#eae8fd") {
  //   setIsColor("대기중", "primary");
  // } else if (color === "#fce5e6") {
  //   setIsColor("완료", "danger");
  // }

  const handleClose = () => {
    setIsModify(false);
    const popoverId = document.querySelector(`#${id}`);
    const backdrop = getComputedStyle(popoverId, "::backdrop");
    if (backdrop) {
      popoverId.hidePopover();
      dispatch(clearUser());
    }
  };

  const onTitle = (e) => {
    setInfo({ ...info, title: e.target.value });
  };
  const onStart = (e) => {
    setInfo({ ...info, start: e.target.value });
  };
  const onEnd = (e) => {
    const startNum = Number(info.start.replace(/-/g, ""));
    const endNum = Number(e.target.value.replace(/-/g, ""));
    if (startNum > endNum) {
      setDateError(true);
    } else {
      setDateError(false);
      setInfo({ ...info, end: e.target.value });
    }
  };

  const onDetail = (data) => {
    setInfo({ ...info, description: data });
  };
  const handleRadio = (value) => {
    let iscolor, isTextColor;

    if (value === "진행중") {
      iscolor = "#dff7e9";
      isTextColor = "#28c76f";
    } else if (value === "대기중") {
      iscolor = "#eae8fd";
      isTextColor = "#7367f0";
    } else if (value === "완료") {
      iscolor = "#fce5e6";
      isTextColor = "#ea5455";
    }
    setRadioValue(value);
    setInfo({ ...info, color: iscolor, textColor: isTextColor });
  };

  const handleModify = () => {
    setIsModify(!isModify);
    dispatch(clearUser());
  };

  // backdrop 클릭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (PopoverRef.current && !PopoverRef.current.contains(event.target)) {
        const popoverId = document.querySelector(`#${id}`);
        popoverId.hidePopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log(isData);

  const handleUpdate = async (e) => {
    //외부파일.js
    e.preventDefault();
    setIsLoading(true);

    const title = info.title;
    const start = info.start;
    const end = info.end;
    const description = info.description;
    const color = info.color;
    const textColor = info.textColor;
    const member = users;

    try {
      const projectId = publicId;
      const projectDocRef = doc(db, "project", projectId);
      const projectDocSnapshot = await getDoc(projectDocRef);
      const projectData = projectDocSnapshot.data();

      const updatedSelectedProject = {
        ...projectData,
        title,
        start,
        end,
        description,
        color,
        textColor,
        member,
      };

      await setDoc(projectDocRef, updatedSelectedProject);
      dispatch(fetchProject());

      const usersUid = users?.map((item) => {
        return item.uid;
      });
      usersUid.forEach(async (item) => {
        const userDocRef = doc(db, "users", item, "project", "data");
        await updateDoc(
          userDocRef,
          {
            title,
            start,
            end,
            description,
            member,
            state: "",
          },
          { merge: true }
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleClose();
      setIsModify(!isModify);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectId = isData.publicId;
      const projectDocRef = doc(db, "project", projectId);

      await deleteDoc(projectDocRef);

      dispatch(fetchProject());
      handleClose();

      // console.log("프로젝트가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting project: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Popup popover="auto" id={id} {...props} ref={PopoverRef}>
        <PopupHeader>
          <Heading size="xs">프로젝트{!isModify ? " 상세보기" : " 수정"}</Heading>
          <Close popovertargetaction="hide" popovertarget={id}>
            <X />
          </Close>
        </PopupHeader>
        {!isModify ? (
          // 상세보기
          <PopupContent>
            <div className="mb2">
              <Input type="text" plainText label="project1" labelText="프로젝트명" readOnly="readonly" value={title} />
            </div>
            <div className="mb2">
              <Input type="text" label="project2" labelText="프로젝트 시작일" plainText readOnly="readonly" value={startDay} />
            </div>
            <div className="mb2">
              <Input type="text" label="project3" labelText="프로젝트 종료일" plainText readOnly="readonly" value={endDay} />
            </div>
            <div className="mb2">
              <Label style={{ marginBottom: "0.5rem" }}>프로젝트 참여 멤버</Label>
              <AvatarGroup>
                {Object.keys(isData).length &&
                  projectMembers?.map((user) => {
                    return <Avatar src={user.userImg} name={user.name} key={user.uid} />;
                  })}
              </AvatarGroup>
            </div>
            <div className="mb2">
              <Label style={{ marginBottom: "0.5rem" }}>프로젝트 상태</Label>
              <div style={{ paddingBottom: "0.5rem" }}>
                <Badge $color={info.badgeClass}>{info.ing}</Badge>
              </div>
            </div>
            <Label style={{ marginBottom: "-0.5rem" }}>프로젝트 정보</Label>
            {Object.keys(isData).length && <div dangerouslySetInnerHTML={{ __html: description }} />}
            <div>
              {isAdmin && (
                <>
                  <Button $color="primary" className="mr2" onClick={handleModify}>
                    Modify
                  </Button>
                  <Button $color="danger" className="mr2" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              )}
              <Button $color="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </PopupContent>
        ) : (
          // 수정하기
          <PopupContent>
            <div className="mb2">
              <Input type="text" label="project1" labelText="프로젝트명" value={info.title} onChange={onTitle} />
            </div>
            <div className="mb2">
              <Input type="date" label="project2" labelText="프로젝트 시작일" value={info.start} onChange={onStart} />
            </div>
            <div className="mb2">
              <Input type="date" label="project3" labelText="프로젝트 종료일" value={info.end} onChange={onEnd} />
            </div>
            <div className="mb2">
              <SelectDetail options="user" label="project4" labelText="프로젝트 참여 멤버" />
            </div>
            <div className="mb2">
              <Label style={{ marginBottom: "0.5rem" }}>진행현황</Label>
              <div>
                <Radio value="진행중" id="ra10_1" name="rag2" color="success" onChange={() => handleRadio("진행중")} checked={radioValue === "진행중"} />
                <Radio value="대기중" id="ra10_2" name="rag2" color="primary" onChange={() => handleRadio("대기중")} checked={radioValue === "대기중"} />
                <Radio value="완료" id="ra10_3" name="rag2" color="danger" onChange={() => handleRadio("완료")} checked={radioValue === "완료"} />
              </div>
            </div>
            <div>
              <Editor title="프로젝트 상세정보" valueData={description} onChange={onDetail}></Editor>
              {/* <div dangerouslySetInnerHTML={{ __html: extendedProps.description }} /> */}
            </div>
            <div>
              {isAdmin && (
                <Button $color="primary" className="mr2" onClick={handleUpdate}>
                  Modify
                </Button>
              )}
              <Button $color="danger" className="mr2" onClick={handleModify}>
                Cancel
              </Button>
              <Button $color="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </PopupContent>
        )}
      </Popup>
    </>
  );
};

export default WorkRead;
