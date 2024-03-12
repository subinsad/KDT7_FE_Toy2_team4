import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import styled from "styled-components";
import calendar from "../assets/ico_calendar.svg";

const InputElement = styled.input`
  display: block;
  width: 100%;
  padding: 0.422rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6f6b7d;
  appearance: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #dbdade;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: var(--primary);
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
    &::placeholder {
      text-indent: 0.3rem;
    }
  }
  &::placeholder {
    transition: 0.4s;
    color: #b7b5be;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &[data-plain] {
    border: none;
    background-color: transparent;
    padding: 0.422rem 0;

    &:focus {
      box-shadow: none;
    }
  }
  &[type="color"] {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  &[type="file"] {
    padding: 0.35rem 0.875rem;
    overflow: hidden;
    &:hover:not([disabled]):not([focus]) {
      border-color: #c9c8ce;
    }
    &:not(:disabled):not([readonly]) {
      cursor: pointer;
    }
    &::file-selector-button {
      padding: 0.573rem 0.875rem;
      margin: -0.422rem -0.875rem;
      margin-inline-end: 0.875rem;
      color: #6f6b7d;
      background-color: #fff;
      pointer-events: none;
      border-color: inherit;
      border-style: solid;
      border-width: 0;
      border-inline-end-width: 1px;
      border-radius: 0;
      transition: all 0.2s ease-in-out;
    }
    &:hover:not(:disabled):not([readonly])::file-selector-button {
      background-color: #f2f2f2;
    }
    @media (prefers-reduced-motion: reduce) {
      &::file-selector-button {
        transition: none;
      }
    }
    &:disabled {
      background-color: rgba(75, 70, 92, 0.08);
      opacity: 1;
    }
  }
  &[type="date"] {
    position: relative;
    background: url(${calendar}) no-repeat right 0.875rem center;
    &::-webkit-clear-button,
    &::-webkit-inner-spin-button {
      display: none;
    }
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;
      color: transparent;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
    &::before {
      content: attr(data-placeholder);
      width: 100%;
    }
    &:valid::before {
      display: none;
    }
  }
`;
export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;
const PasswordGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  position: relative;
  label {
    grid-column: 1/-1;
  }
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    border: 1px solid #dbdade;
    border-left: none;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    background-color: var(--white);
    padding: 0 0.6rem;
  }
`;

function Input({ plainText, label, labelText, showPassword, ...props }) {
  const plain = plainText && { "data-plain": true };
  const [isShow, setIsShow] = useState(false);
  const [isToggle, setIsToggle] = useState("password");

  const onClick = () => {
    setIsShow(!isShow);
    setIsToggle(isToggle === "password" ? "text" : "password");
  };

  return (
    <>
      {showPassword ? (
        <PasswordGroup>
          {label && <Label htmlFor={label}>{labelText}</Label>}
          <InputElement id={label} {...plain} {...props} type={isToggle} />
          <button className="togglePassword" onClick={onClick}>
            {isShow ? <Eye /> : <EyeSlash />}
          </button>
        </PasswordGroup>
      ) : (
        <>
          {label && <Label htmlFor={label}>{labelText}</Label>}
          <InputElement id={label} {...plain} {...props} />
        </>
      )}
    </>
  );
}

export default Input;
