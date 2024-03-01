import styled from "styled-components";

const TextareaElement = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.422rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6f6b7d;
  appearance: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #dbdade;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: var(--primary);
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
    &::placeholder {
      text-indent: 0.3rem;
    }
  }
  &::placeholder {
    transition: 0.4s;
    color: #b7b5be;
  }
`;
const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;
function Textarea({ label, labelText, children, ...props }) {
  return (
    <>
      {label && <Label htmlFor={label}>{labelText}</Label>}
      <TextareaElement id={label} {...props}>
        {children}
      </TextareaElement>
    </>
  );
}

export default Textarea;
