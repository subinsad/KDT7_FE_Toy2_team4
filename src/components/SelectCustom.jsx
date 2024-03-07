import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { Badge } from "./GlobalStyles";
import Alert from "./Alert";

const Label = styled.div`
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;
const SelectDetailButton = styled.button`
  --bs-form-select-bg-img: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%236f6b7d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='white' stroke-opacity='0.2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");

  display: block;
  width: 100%;
  padding: 0.422rem 2.45rem 0.422rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6f6b7d;
  appearance: none;
  background-color: #fff;
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 22px 20px;
  border: 1px solid #dbdade;
  border-radius: 0.375rem;
  text-align: left;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: var(--primary);
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  }
`;
const List = styled.ul`
  position: absolute;
  z-index: 10;
  top: 2.5rem 0 0;
  width: 100%;
  height: auto;
  list-style: none;
  box-shadow: 0 0.25rem 1rem rgba(165, 163, 174, 0.45);
  background-color: #fff;
  button {
    display: flex;
    align-items: center;
    width: calc(100% - 1rem);
    text-align: left;
    margin: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 500;
    color: #6f6b7d;
    &:hover {
      color: var(--primary);
      background-color: var(--primaryLabel);
    }
    &::before {
      content: "";
      margin-right: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }
    &[value="pending"] {
      &::before {
        background-color: var(--primary);
      }
    }
    &[value="progress"] {
      &::before {
        background-color: var(--success);
      }
    }
    &[value="completed"] {
      &::before {
        background-color: var(--danger);
      }
    }
  }
  &.user {
    height: 20rem;
    overflow: auto;
    button {
      justify-content: flex-start;
      gap: 0.5rem;
      &[role] {
        padding: 0;
        width: 2rem;
        background-color: var(--darkLabel);
        border-radius: 100%;
        margin: 0;
      }
      &::before {
        display: none;
      }
      span {
        flex: 1;
      }
    }
  }
`;
const SelectDetailWrap = styled.div`
  position: relative;
`;
const MemberTag = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, auto));
  .tag {
    display: inline-grid;
    white-space: nowrap;
    padding: 0.5rem;
    font-weight: 400;
  }
`;

const SelectCustom = ({ option, labelText }) => {
  const [isList, setIsList] = useState(false);
  const [isValue, setIsValue] = useState("SelectDetail");
  const [isUser, setIsUser] = useState("멤버선택");

  const handleList = () => {
    setIsList(!isList);
  };
  const handleText = (e) => {
    setIsValue(e.target.textContent);
    setIsList(false);
  };
  const handleUser = (e) => {
    setIsValue(e.target.textContent);
    setIsList(false);
  };

  return (
    <>
      <Label>{labelText}</Label>
      <SelectDetailWrap>
        <SelectDetailButton onClick={handleList}>{option === "state" ? isValue : isUser}</SelectDetailButton>
        {isList &&
          (option === "state" ? (
            <List cla>
              <li>
                <button value="pending" onClick={handleText}>
                  대기중
                </button>
              </li>
              <li>
                <button value="progress" onClick={handleText}>
                  진행중
                </button>
              </li>
              <li>
                <button value="completed" onClick={handleText}>
                  완료
                </button>
              </li>
            </List>
          ) : (
            <>
              <MemberTag>
                <Alert color="primary" close className="tag">
                  아무개
                </Alert>
              </MemberTag>
              <List className="user">
                <li>
                  <button value="pending" onClick={handleUser}>
                    <Avatar size={"sm"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/7.png"} role="strong" />
                    <span className="name">Ha</span>
                  </button>
                </li>
                <li>
                  <button value="progress" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">Mr. So</span>
                  </button>
                </li>
                <li>
                  <button value="completed" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">감무양</span>
                  </button>
                </li>
                <li>
                  <button value="pending" onClick={handleUser}>
                    <Avatar size={"sm"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/7.png"} role="strong" />
                    <span className="name">Ha</span>
                  </button>
                </li>
                <li>
                  <button value="progress" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">Mr. So</span>
                  </button>
                </li>
                <li>
                  <button value="completed" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">감무양</span>
                  </button>
                </li>
                <li>
                  <button value="pending" onClick={handleUser}>
                    <Avatar size={"sm"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/7.png"} role="strong" />
                    <span className="name">Ha</span>
                  </button>
                </li>
                <li>
                  <button value="progress" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">Mr. So</span>
                  </button>
                </li>
                <li>
                  <button value="completed" onClick={handleUser}>
                    <Avatar size={"sm"} role="strong" />
                    <span className="name">감무양</span>
                  </button>
                </li>
              </List>
            </>
          ))}
      </SelectDetailWrap>
    </>
  );
};

export default SelectCustom;
