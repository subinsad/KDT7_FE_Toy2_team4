import styled from "styled-components";
import Select from "./Select";
import { useRef, useState } from "react";

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
  padding: 0.5rem;
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
    height: 2rem;
    background-color: var(--white);
    border-radius: 0.375rem;
    &:hover {
      background-color: var(--secondaryLabel);
    }
    &.font1 {
      font-size: 0.5rem;
    }
    &.font2 {
      font-size: 0.7rem;
    }
    &.font3 {
      font-size: 0.9rem;
    }
    &.font4 {
      font-size: 1.1rem;
    }
    &.font5 {
      font-size: 1.3rem;
    }
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

const changeFontSize = (size) => {
  document.execCommand("fontSize", false, size);
};
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

function Editor({ title, children, onChange, valueData, ...props }) {
  const editableRef = useRef(null);
  const fontSizeOptions = [1, 2, 3, 4, 5];

  const handleOnChange = () => {
    onChange(editableRef.current.innerHTML);
  };

  return (
    <>
      {title && <Title>{title}</Title>}
      <EditorWrap {...props}>
        <Toolbar>
          {fontSizeOptions.map((size) => (
            <button type="button" key={size} className={`font${size}`} onClick={() => changeFontSize(size)}>
              {size}
            </button>
          ))}
          <button type="button" className="bold" onClick={makeBold}>
            B
          </button>
          <button type="button" className="itelic" onClick={makeItelic}>
            I
          </button>
          <button type="button" className="underline" onClick={makeUnderline}>
            U
          </button>
          <button type="button" className="strike" onClick={makeStrike}>
            S
          </button>
          {/* <input type="color" className="color" value="A" />
          <input type="color" className="bg" value="A" /> */}
        </Toolbar>
        {valueData ? <EditorTable ref={editableRef} contentEditable="true" onInput={handleOnChange} dangerouslySetInnerHTML={{ __html: valueData }} /> : <EditorTable ref={editableRef} contentEditable="true" onInput={handleOnChange} dangerouslySetInnerHTML={{ __html: children }} />}
      </EditorWrap>
    </>
  );
}
export default Editor;
