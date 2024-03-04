import React from "react";
import styled from "styled-components";

const Email = styled.div`
  --right: 8rem;
  --rightAt: calc(var(--right) + 0.2rem);

  display: grid;
  grid-template-columns: 1fr var(--right);
  align-items: center;
  gap: 1.5rem;
  position: relative;
  background-color: #fff;
  border: 1px solid #dbdade;
  border-radius: 0.375rem;
  overflow: hidden;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &::after {
    content: "@";
    position: absolute;
    right: var(--rightAt);
  }
  &:has(> *:focus) {
    border-color: var(--primary);
    outline: 0;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
    input {
      border-right-color: var(--primary);
    }
  }
  input {
    border: none;
    border-right: 1px solid #dbdade;
    border-radius: 0;
    margin-right: 0.5rem;
    &:focus {
      box-shadow: none;
    }
  }
  select {
    padding-left: 0;
    border: none;
    outline: none;
  }
`;
const Span = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;

const EmailGroup = ({ title, children, ...props }) => {
  return (
    <>
      {title && <Span>{title}</Span>}
      <Email>{children}</Email>
    </>
  );
};

export default EmailGroup;
