import { useState } from "react";
import { X } from "react-bootstrap-icons";
import styled, { css } from "styled-components";
import Heading from "./Heading";

const Alerts = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  background: ${(props) => `var(--${props.$color}Label)`};
  color: ${(props) => `var(--${props.$color})`};
  border: 1px solid;
  border-color: ${(props) => `var(--${props.$color}Label)`};
  font-weight: 700;
  padding: 0.687rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.81em;

  &:has(h3) {
    grid-template-columns: 1fr;
    font-weight: 400;
    h3 {
      color: ${(props) => `var(--${props.$color})`};
      padding: 0 0 0.5rem;
      font-weight: 700;
      font-size: 1rem;
    }
  }
  &:has(h3 ~ button) {
    div {
      grid-column: 1/-1;
      grid-row: 2/3;
    }
    button {
      grid-column: 2/3;
      grid-row: 1/2;
    }
  }
  &:has(div > svg:first-child) {
    position: relative;
    padding-left: 4rem;
    div > svg:first-child {
      position: absolute;
      left: 0.875rem;
      top: 0.687rem;
      font-size: 2.1rem;
      padding: 0.375rem;
      background-color: var(--white);
      border-radius: 0.375rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  color: ${(props) => `var(--${props.$color})`};
  font-size: 0;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

function Alert({ color, close, title, children, openAlert, onClick, ...props }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleonClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Alerts $color={color} {...props}>
          {title && (
            <Heading size={"xs"} tag={"h3"}>
              {title}
            </Heading>
          )}
          <div>{children}</div>
          {close && (
            <CloseButton onClick={handleonClick}>
              <X />
            </CloseButton>
          )}
        </Alerts>
      )}
    </>
  );
}

export default Alert;
