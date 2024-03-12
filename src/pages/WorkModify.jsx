import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";
import Input from "../components/Input";
import Editor from "../components/Editor";
import { Button, FormText } from "../components/GlobalStyles";
import SelectDetail from "../components/SelectCustom";
import { auth, db } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
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

const WorkModify = ({ id, getData, ...props }) => {
  const [info, setInfo] = useState({});
  const [member, setMember] = useState("");
  const [first, setfirst] = useState("");
  const [dateError, setDateError] = useState(false);

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
  const onSelect = (value) => {
    if (value === "pending") {
      setInfo({ ...info, color: "#eae8fd", textColor: "#7367f0", state: "대기중" });
    } else if (value === "progress") {
      setInfo({ ...info, color: "#dff7e9", textColor: "#28c76f", state: "진행중" });
    } else if (value === "completed") {
      setInfo({ ...info, color: "#fce5e6", textColor: "#ea5455", state: "완료" });
    }
  };
  const onDetail = (e) => {
    setInfo({ ...info, description: e });
  };

  const onMember = ({ uid, team, name }) => {
    setInfo({ ...info, member: { uid, team, name } });
  };

  const handleProject = async (e) => {
    e.preventDefault();

    const title = info.title;
    const start = info.start;
    const end = info.end;
    const state = info.state;
    const description = info.description;
    const color = info.color;
    const textColor = info.textColor;

    console.log(info);

    if (title === "" || start === "" || end === "" || info.color === "" || description === "" || state === "") {
      return console.log("모두입력하셔요");
    }

    try {
      await addDoc(collection(db, "project"), {
        title,
        start,
        end,
        state,
        description,
        color,
        textColor,
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      console.log("완료");
    }
  };

  const handleClose = () => {
    const popoverId = document.querySelector(`#${id}`);
    const body = document.body;
    popoverId.hidePopover();
    body.style.overflow = "visible";
  };

  const backDropClose = () => {
    const backdrop = document.querySelector(`#${id}:backdrop`);
    backdrop.addEventListener("click", () => {
      handleClose();
    });
  };
  // backDropClose();

  return (
    <Popup popover="auto" id={id} {...props}>
      <PopupHeader>
        <Heading size="xs">프로젝트 수정</Heading>
        <Close popovertargetaction="hide" popovertarget={id}>
          <X />
        </Close>
      </PopupHeader>
      <PopupContent>
        <div className="mb2">
          <Input type="text" label="project1" labelText="프로젝트명" onChange={onTitle} />
        </div>
        <div className="mb2">
          <Input type="date" label="project2" labelText="프로젝트 시작일" onChange={onStart} data-placeholder="YYYY-MM-DD" />
        </div>
        <div className="mb2">
          <Input type="date" label="project3" labelText="프로젝트 종료일" onChange={onEnd} data-placeholder="YYYY-MM-DD" />
          {dateError && <FormText $error>종료일은 시작일보다 같은날이거나 다음날이어야 합니다.</FormText>}
        </div>
        <div className="mb2">
          <SelectDetail options="user" label="project4" labelText="프로젝트 참여 멤버" onMemberTagChange={onMember} />
        </div>
        <div className="mb2">
          <SelectDetail option="state" labelText="프로젝트 현황" onSelected={onSelect} />
        </div>
        {/* <div className="mb2">
          <Select options={optionProject} label="project5" labelText="프로젝트 진행 현황" />
        </div> */}
        <div>
          <Editor title="프로젝트 상세정보" onChange={onDetail}></Editor>
        </div>
        <div>
          <Button $color="primary" className="mr2" onClick={handleProject}>
            Modify
          </Button>
          <Button $color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </PopupContent>
    </Popup>
  );
};

export default WorkModify;
