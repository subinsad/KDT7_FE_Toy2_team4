import styled, { css } from "styled-components";

const HeadingName = styled.div`
  color: var(--heading);
  font-size: 1.625rem;
  font-weight: 500;
  line-height: 1.37;
  ${({ $size }) =>
    $size === "xl" &&
    css`
      font-size: 2.375rem;
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      font-size: 2rem;
    `}
  ${({ $size }) =>
    $size === "sm" &&
    css`
      font-size: 1.375rem;
    `}
  ${({ $size }) =>
    $size === "xs" &&
    css`
      font-size: 1.125rem;
    `}
`;

function Heading({ size, tag, children }) {
  return (
    <HeadingName as={tag} $size={size}>
      {children}
    </HeadingName>
  );
}

export default Heading;
