import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  :root {
    --primary:#7367f0;
    --secondary:#97999d;
    --success:#28c76f;
    --danger:#ea5455;
    --warning:#ff9f43;
    --info:#00cfe8 ;
    --dark:#4b4b4b;
    --primaryLabel:#eae8fd ;
    --secondaryLabel:#f2f2f3 ;
    --successLabel:#dff7e9 ;
    --dangerLabel:#fce5e6 ;
    --warningLabel:#fff1e3 ;
    --infoLabel:#d9f8fc  ;
    --darkLabel:#e4e4e4 ;
    --white:#fff;
    --heading:#5d596c;
    --border:#dbdade;
  }
  a {
    color:inherit;
    text-decoration: none;
  }
  * {
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 100%;
  }
  body {
    font-size: 1rem;
    background-color: #f8f7fa;
    color:#6f6b7d;
  }
  button {
    border:none;
    cursor: pointer;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  .mb3 {
    margin-bottom: 1rem;
  }
  .mr2 {
    margin-right: .5rem;
  }

  hr{
    margin:1.5rem 0;
    border:1px solid #dbdade;
    border-bottom:none;
  }

  .align {
    display: flex;
    &.right {
      justify-content: flex-end;
    }
    &.center {
      justify-content: center;
    }
    &.both {
      justify-content: space-between;
    }
    &.vm {
      align-items: center;
    }
  }
  .text-left {
    text-align: left;
  }
`;
export default GlobalStyles;
export const Main = styled.main`
  padding: 120px 0 0 16.25rem;
`;
export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: 1800px) {
    padding: 0 1rem;
  }
`;
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.6rem 1.25rem;
  background-color: ${(props) => (props.$outline ? `var(--white)` : `var(--${props.$color})`)};
  border: 1px solid;
  border-color: ${(props) => `var(--${props.$color})`};
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  color: ${(props) => (props.$outline ? `var(--${props.$color})` : `var(--white)`)};
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);

  ${({ $size }) =>
    $size === "xl" &&
    css`
      padding: 0.875rem 1.75rem;
      font-size: 1.25rem;
      border-radius: 0.5rem;
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      padding: 0.84rem 1.625rem;
      font-size: 1.0625rem;
      border-radius: 0.5rem;
    `}
${({ $size }) =>
    $size === "sm" &&
    css`
      padding: 0.41rem 0.875rem;
      font-size: 0.8125rem;
      border-radius: 0.25rem;
    `}
${({ $size }) =>
    $size === "xs" &&
    css`
      padding: 0.175rem 0.75rem;
      font-size: 0.69rem;
      border-radius: 0.25rem;
    `}

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.49em 1em;
  background-color: ${(props) => `var(--${props.$color}Label)`};
  border: 1px solid;
  border-color: ${(props) => `var(--${props.$color}Label)`};
  border-radius: 0.25em;
  font-size: 0.81em;
  font-weight: 500;
  color: ${(props) => `var(--${props.$color})`};
  white-space: nowrap;

  svg {
    font-size: 1rem;
  }

  ${Button} & {
    padding: 0.35rem;
    height: 1.5rem;
    font-size: 0.812rem;
    margin-left: 0.25rem;
  }
`;

export const FormText = styled.div`
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: ${(props) => (props.$error ? `var(--danger)` : `#a5a3ae`)};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$col}, 1fr);
  gap: 1.5rem;
`;
export const GridColumnSpan = styled.div`
  grid-column: span ${(props) => props.$span};
`;
export const GridRowSpan = styled.div`
  grid-row: span ${(props) => props.$span};
`;

export const Table = styled.table`
  color: #5d596c;
  margin-bottom: 1rem;
  thead {
    border-top: 1px solid #dbdade;
    border-bottom: 1px solid #dbdade;
    th {
      text-transform: uppercase;
      font-size: 0.8125rem;
      letter-spacing: 1px;
      padding: 0.88rem 1.25rem;
      text-align: left;
    }
  }
  tbody {
    border-top: 1px solid #dbdade;
    td {
      border-bottom: 1px solid #dbdade;
      font-size: 0.9375rem;
      padding: 0.55rem 1.25rem;
      box-sizing: content-box;
      vertical-align: middle;
    }
  }
`;

export const TablePaging = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`;
export const PagingItem = styled(Button)`
  background-color: ${(props) => (props.$active ? `var(--primary)` : `rgba(75, 70, 92, 0.08)`)};
  border: none;
  color: ${(props) => (props.$active ? `#fff` : ` #5d596c`)};
  box-shadow: none;
  padding: 0.745rem;
  min-width: 2.38155rem;
  line-height: 1;
  transition: all 0.5s;
  ${(props) =>
    !props.$active &&
    css`
      &:hover {
        background: rgba(74, 70, 87, 0.16);
      }
    `}
`;
