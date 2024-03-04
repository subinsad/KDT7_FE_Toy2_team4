import styled from "styled-components";
import Select from "./Select";
import { useRef } from "react";

const boldSelect = [
  {
    value: "normal",
    text: "normal",
  },
  {
    value: "small",
    text: "small",
  },
  {
    value: "large",
    text: "large",
  },
  {
    value: "xlarge",
    text: "xlarge",
  },
];
const EditorWrap = styled.div`
  border: 1px solid #dbdade;
`;
const EditorTable = styled.div`
  padding: 1.25rem;
  min-height: 15rem;
  background: #fff;
  overflow-y: auto;
  height: 100%;
  tab-size: 4;
  line-height: 1.4;
  box-sizing: border-box;
  display: block;
  outline: none;
  word-wrap: break-word;
  white-space: pre-wrap;
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdade;
  select {
    border: none;
    border-radius: 0;
    width: auto;
  }
  button {
    padding: 0 1rem;
    background-color: var(--white);
    &.bold {
      font-weight: bold;
    }
    &.itelic {
      font-style: italic;
    }
    &.underline {
      text-decoration: underline;
    }
    &.strike {
      text-decoration: line-through;
    }
  }
  input {
    border: none;
    background-color: transparent;
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.div`
  margin-bottom: 0.672rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;

function Editor({ title, children, ...props }) {
  const editableRef = useRef(null);
  const makeBold = () => {
    document.execCommand("bold", false, null);
  };
  const makeItelic = () => {
    document.execCommand("italic", false, null);
  };
  const makeUnderline = () => {
    document.execCommand("underline", false, null);
  };
  const makeStrike = () => {
    document.execCommand("strikethrough", false, null);
  };
  return (
    <>
      {title && <Title>{title}</Title>}
      <EditorWrap {...props}>
        <Toolbar>
          <Select options={boldSelect}></Select>
          <button className="bold" onClick={makeBold}>
            B
          </button>
          <button className="itelic" onClick={makeItelic}>
            I
          </button>
          <button className="underline" onClick={makeUnderline}>
            U
          </button>
          <button className="strike" onClick={makeStrike}>
            S
          </button>
          {/* <input type="color" className="color" value="A" />
          <input type="color" className="bg" value="A" /> */}
        </Toolbar>
        <EditorTable ref={editableRef} contentEditable="true">
          {children}
        </EditorTable>
      </EditorWrap>
    </>
  );
}
export default Editor;
