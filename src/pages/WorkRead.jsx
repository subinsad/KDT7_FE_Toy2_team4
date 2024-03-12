import React, { useState } from "react";
import Heading from "../components/Heading";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";
import Input from "../components/Input";
import Editor from "../components/Editor";
import { Button } from "../components/GlobalStyles";
import SelectDetail from "../components/SelectCustom";

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

const WorkRead = ({ id, getData, isData, ...props }) => {
  const handleClose = () => {
    const popoverId = document.querySelector(`#${id}`);
    popoverId.hidePopover();
  };

  const { title, start, end, extendedProps } = isData;
  const startDate = new Date(start);
  const startyear = startDate.getFullYear();
  const startmonth = startDate.getMonth() + 1;
  const startday = startDate.getDate();
  const endDate = new Date(end);
  const endyear = endDate.getFullYear();
  const endmonth = endDate.getMonth() + 1;
  const endday = endDate.getDate();

  const formatStartDate = `${startyear}년 ${startmonth < 10 ? "0" + startmonth : startmonth}월 ${startday < 10 ? "0" + startday : startday}일`;
  const formatEndDate = `${endyear}년 ${endmonth < 10 ? "0" + endmonth : endmonth}월 ${endday < 10 ? "0" + endday : endday}일`;

  return (
    <Popup popover="auto" id={id} {...props}>
      <PopupHeader>
        <Heading size="xs">프로젝트</Heading>
        <Close popovertargetaction="hide" popovertarget={id}>
          <X />
        </Close>
      </PopupHeader>
      <PopupContent>
        <div className="mb2">
          <Input type="text" plainText label="project1" labelText="프로젝트명" readOnly="readonly" value={title} />
        </div>
        <div className="mb2">
          <Input type="text" label="project2" labelText="프로젝트 시작일" plainText readOnly="readonly" value={formatStartDate} />
        </div>
        <div className="mb2">
          <Input type="text" label="project3" labelText="프로젝트 종료일" plainText readOnly="readonly" value={formatEndDate} />
        </div>
        <div className="mb2">
          <SelectDetail options="user" label="project4" labelText="프로젝트 참여 멤버" />
        </div>
        <div className="mb2">
          <Input type="text" label="project5" labelText="프로젝트 현황" plainText readOnly="readonly" value={extendedProps.state} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: extendedProps.description }} />
        <div>
          <Button $color="primary" className="mr2">
            Modify
          </Button>
          <Button $color="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </PopupContent>
    </Popup>
  );
};

export default WorkRead;
