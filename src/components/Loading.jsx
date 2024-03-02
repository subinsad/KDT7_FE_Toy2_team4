import styled, { keyframes } from "styled-components";

const barLoading = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 25px;
  }
`;

const LoadingWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  span {
    width: 7px;
    height: 0;
    background-color: rgba(0, 0, 0, 0.3);
    animation: ${barLoading} infinite 0.6s alternate;
    animation-delay: var(--delay);
  }
`;
const Loading = () => {
  return (
    <LoadingWrap>
      <span style={{ "--delay": "0.1s" }}></span>
      <span style={{ "--delay": "0.2s" }}></span>
      <span style={{ "--delay": "0.3s" }}></span>
      <span style={{ "--delay": "0.4s" }}></span>
      <span style={{ "--delay": "0.5s" }}></span>
      <span style={{ "--delay": "0.6s" }}></span>
    </LoadingWrap>
  );
};

export default Loading;
