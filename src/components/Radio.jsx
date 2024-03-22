import { useState } from "react";
import styled from "styled-components";

const RadioButton = styled.input`
  border-radius: 0.25em;
  cursor: pointer;
  width: 1.2em;
  height: 1.2em;
  border-radius: 100%;
  margin: 0 0.5rem 0 0;
  vertical-align: top;
  appearance: none;
  background-color: var(--white);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 2px solid #dbdade;
  &:checked {
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='13' viewBox='0 0 15 14' fill='none'%3E%3Cpath d='M3.41667 7L6.33333 9.91667L12.1667 4.08333' stroke='%23fff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-color: ${(props) => (props.$color ? `var(--${props.$color})` : `var(--primary)`)};
    border-color: ${(props) => (props.$color ? `var(--${props.$color})` : `var(--primary)`)};
    &:disabled {
      opacity: 0.5;
      + label {
        opacity: 0.5;
      }
    }
  }
  &:disabled:not(:checked) {
    background-color: #dbdade;
    pointer-events: none;
    filter: none;
    opacity: 0.5;
    + label {
      opacity: 0.5;
    }
  }
`;
const Label = styled.label`
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  + input {
    margin-left: 1rem;
  }
`;
export const RadioWrap = styled.div`
  input ~ input {
    margin-left: 0.8rem;
  }
  .title {
    margin-bottom: 0.672rem;
    font-size: 0.8125rem;
    color: #5d596c;
  }
`;
export function RadioGroup({ title, children }) {
  return (
    <>
      <RadioWrap>
        <div className="title">{title}</div>
        {children}
      </RadioWrap>
    </>
  );
}

function Radio({ id, value, name, color, checked, onChange, ...props }) {
  const handleChange = () => {
    onChange(value); // 부모 컴포넌트의 상태를 변경하는 함수 호출
  };

  return (
    <>
      <RadioButton name={name} type="radio" id={id} checked={checked} onChange={handleChange} $color={color} {...props} />
      <Label htmlFor={id}>{value}</Label>
    </>
  );
}

export default Radio;
