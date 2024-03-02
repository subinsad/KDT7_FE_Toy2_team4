import { createElement } from "react";
import styled, { css } from "styled-components";

const AvatarWrap = styled.button`
  width: 2.375rem;
  height: 2.375rem;
  padding: 0;
  position: relative;
  border-radius: 100%;
  background: no-repeat center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='1em' height='1em' fill='currentColor'%3E%3Cpath d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'%3E%3C/path%3E%3C/svg%3E");
  background-color: var(--darkLabel);
  background-size: 1.3rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: 2;
  }

  ${({ $size }) =>
    $size === "xl" &&
    css`
      width: 4.5rem;
      height: 4.5rem;
      background-size: 2.5rem;
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      width: 4rem;
      height: 4rem;
      background-size: 2.3rem;
    `}
      ${({ $size }) =>
    $size === "md" &&
    css`
      width: 3rem;
      height: 3rem;
      background-size: 1.8rem;
    `}
      ${({ $size }) =>
    $size === "sm" &&
    css`
      width: 2rem;
      height: 2rem;
      background-size: 1rem;
    `}
      ${({ $size }) =>
    $size === "xs" &&
    css`
      width: 1.625rem;
      height: 1.625rem;
      background-size: 0.9rem;
    `}
`;

export const AvatarGroup = styled.div`
  display: flex;
  margin-left: 0.8rem;
  button {
    position: relative;
    margin-left: -0.8rem;
    border: 2px solid #fff;
    transform: translateY(0);
    transition: transform 0.4s;
    &:hover {
      z-index: 2;
      transform: translateY(-0.5rem);
    }
  }
`;
const onMouseOver = (e) => {
  const span = document.createElement("span");
  span.innerText = "name";
  e.target.appendChild(span);
};
const onMouseOut = (e) => {
  const span = e.target.querySelector("span");
  if (span) {
    span.remove();
  }
};

function Avatar({ size, src, ...props }) {
  return (
    <>
      <AvatarWrap $size={size} {...props} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        {src && <img src={src} alt="" />}
      </AvatarWrap>
    </>
  );
}

export default Avatar;
