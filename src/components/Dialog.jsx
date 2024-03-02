import { X } from "react-bootstrap-icons";
import styled from "styled-components";

const Popup = styled.div`
  overflow: visible;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0.31rem 1.25rem 0 rgba(75, 70, 92, 0.4);
  border-radius: 0.375rem;
  min-width: 20rem;
  padding: 1.25em;
  text-align: center;
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
  right: -0.5rem;
  top: -0.5rem;
  background-color: #fff;
  border-radius: 0.375rem;
  opacity: 1;
  font-size: 0;
  padding: 0.2rem;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  transition: all 0.23s ease 0.1s;
  &:hover {
    right: -0.2rem;
    top: -0.2rem;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--secondary);
  }
`;

const Dialog = ({ id, children }) => {
  return (
    <Popup popover="auto" id={id}>
      <Close popovertargetaction="hide" popovertarget={id}>
        <X />
      </Close>
      <div>{children}</div>
    </Popup>
  );
};

export default Dialog;
