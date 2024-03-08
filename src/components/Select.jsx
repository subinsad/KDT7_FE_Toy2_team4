import styled from "styled-components";

export const SelectBox = styled.select`
  --bs-form-select-bg-img: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%236f6b7d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='white' stroke-opacity='0.2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  display: block;
  width: 100%;
  padding: 0.422rem 2.45rem 0.422rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6f6b7d;
  appearance: none;
  background-color: #fff;
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 22px 20px;
  border: 1px solid #dbdade;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: var(--primary);
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  }
`;
const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  color: #5d596c;
`;

function Select({ options, label, labelText, ...props }) {
  return (
    <>
      {label && <Label htmlFor={label}>{labelText}</Label>}
      <SelectBox id={label} {...props}>
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </SelectBox>
    </>
  );
}

export default Select;
