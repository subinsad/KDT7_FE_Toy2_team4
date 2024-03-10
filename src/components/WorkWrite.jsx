import React, { useState } from "react";
import Heading from "../components/Heading";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";
import Input from "./Input";
import Editor from "./Editor";
import { Button } from "./GlobalStyles";
import SelectDetail from "./SelectCustom";
const Popup = styled.div`
  overflow: visible;
  left: inherit;
  right: 0;
  top: 0;
  box-shadow: 0 0.31rem 1.25rem 0 rgba(75, 70, 92, 0.4);
  height: 100vh;
  min-width: 20rem;
  > div {
    display: grid;
    gap: 1rem;
  }
  &::backdrop {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
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

const WorkWrite = ({ id, getData }) => {
  const [info, setInfo] = useState({});
  const [member, setMember] = useState([]);
  const [childNodes, setChildNodes] = useState([]);

  const onTitle = (e) => {
    setInfo({ ...info, title: e.target.value });
  };
  const onStart = (e) => {
    setInfo({ ...info, start: e.target.value });
  };
  const onEnd = (e) => {
    setInfo({ ...info, end: e.target.value });
  };
  const onSelect = (value) => {
    if (value === "pending") {
      setInfo({ ...info, color: "#eae8fd", textColor: "#7367f0" });
    } else if (value === "progress") {
      setInfo({ ...info, color: "#dff7e9", textColor: "#28c76f" });
    } else if (value === "completed") {
      setInfo({ ...info, color: "#fce5e6", textColor: "#ea5455" });
    }
  };
  const onDetail = (childNode) => {
    setChildNodes(childNode);
  };

  const onMember = (members) => {
    setMember(members);
  };

  const handleProject = () => {
    getData(info);
    console.log(childNodes);
    setInfo({});
  };

  return (
    <Popup popover="auto" id={id}>
      <PopupHeader>
        <Heading size="xs">프로젝트 추가</Heading>
        <Close popovertargetaction="hide" popovertarget={id}>
          <X />
        </Close>
      </PopupHeader>
      <PopupContent>
        <div className="mb2">
          <Input type="text" label="project1" labelText="프로젝트명" onChange={onTitle} />
        </div>
        <div className="mb2">
          <Input type="date" label="project2" labelText="프로젝트 시작일" onChange={onStart} />
        </div>
        <div className="mb2">
          <Input type="date" label="project3" labelText="프로젝트 종료일" onChange={onEnd} />
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
          <Button $color="primary" className="mr2" onClick={handleProject} popovertarget={id} popovertargetaction="hide">
            Add
          </Button>
          <Button $color="secondary" popovertarget={id} popovertargetaction="hide" childNodes={childNodes}>
            Cancel
          </Button>
        </div>
      </PopupContent>
    </Popup>
  );
};

export default WorkWrite;
