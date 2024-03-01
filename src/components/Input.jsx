import styled from "styled-components";

const InputElement = styled.input`
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
  }
  &::placeholder {
    color: #b7b5be;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &[data-plain] {
    border: none;
    background-color: transparent;
    padding: 0.422rem 0;

    &:focus {
      box-shadow: none;
    }
  }
`;
const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;

function Input({ plainText, label, labelText, ...props }) {
  const plain = plainText && { "data-plain": true };
  return (
    <>
      {label && <Label htmlFor={label}>{labelText}</Label>}
      <InputElement id={label} {...plain} {...props} />
    </>
  );
}

export default Input;
