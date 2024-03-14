import React, { useState } from "react";
import Heading from "../components/Heading";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";
import Input from "../components/Input";
import Editor from "../components/Editor";
import { Button, FormText } from "../components/GlobalStyles";
import SelectDetail from "../components/SelectCustom";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/projectUser.slice";
import { fetchProject } from "../store/project.slice";
const Popup = styled.div`
  overflow: visible;
  left: inherit;
  right: 0;
  top: 0;
  box-shadow: 0 0.31rem 1.25rem 0 rgba(75, 70, 92, 0.4);
  height: 100vh;
  overflow: auto;
  min-width: 20rem;
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

const WorkWrite = ({ id, getData, ...props }) => {
  const [info, setInfo] = useState({});
  const [member, setMember] = useState("");
  const [first, setfirst] = useState("");
  const [dateError, setDateError] = useState(false);
  const { users } = useSelector((state) => state.projectUserSlice);
  const dispatch = useDispatch();

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

  const onDetail = (e) => {
    setInfo({ ...info, description: e });
  };

  const handleProject = async (e) => {
    e.preventDefault();

    const title = info.title;
    const start = info.start;
    const end = info.end;
    // const state = info.state;
    const description = info.description;
    const color = "#dff7e9";
    const textColor = "#28c76f";
    const member = users;

    if (title === "" || start === "" || end === "" || description === "") {
      return console.log("모두입력하셔요");
    }

    try {
      await addDoc(collection(db, "project"), {
        title,
        start,
        end,
        description,
        color,
        textColor,
        member,
      });
      dispatch(fetchProject());
      //모든 멤버들의 아이디를 받고 받은 아이디에 대하여 파이어베이스 해당 유저 프로젝트 컬렉션에 해당 프로젝트 내용 입력
      const usersUid = users.map((item) => {
        return item.uid;
      });
      usersUid.forEach(async (item) => {
        const userDocRef = doc(db, "users", item, "project", "data");
        await setDoc(
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
      handleClose();
    }
  };

  const handleClose = () => {
    const popoverId = document.querySelector(`#${id}`);
    popoverId.hidePopover();
    dispatch(clearUser());
    setInfo({});
  };

  return (
    <Popup popover="auto" id={id} {...props}>
      <PopupHeader>
        <Heading size="xs">프로젝트 추가</Heading>
        <Close popovertargetaction="hide" popovertarget={id}>
          <X />
        </Close>
      </PopupHeader>
      <PopupContent>
        <div className="mb2">
          <Input type="text" label="project1" labelText="프로젝트명" defaultValue="" onChange={onTitle} />
        </div>
        <div className="mb2">
          <Input type="date" label="project2" labelText="프로젝트 시작일" defaultValue="" onChange={onStart} />
        </div>
        <div className="mb2">
          <Input type="date" label="project3" labelText="프로젝트 종료일" defaultValue="" onChange={onEnd} />
          {dateError && <FormText $error>종료일은 시작일보다 같은날이거나 다음날이어야 합니다.</FormText>}
        </div>
        <div className="mb2">
          <SelectDetail options="user" label="project4" labelText="프로젝트 참여 멤버" />
        </div>
        <div>
          <Editor title="프로젝트 상세정보" onChange={onDetail}></Editor>
        </div>
        <div>
          <Button $color="primary" className="mr2" onClick={handleProject}>
            Add
          </Button>
          <Button $color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </PopupContent>
    </Popup>
  );
};

export default WorkWrite;
