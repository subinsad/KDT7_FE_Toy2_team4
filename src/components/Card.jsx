import styled from "styled-components";

const CardWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: var(--white);
  border-radius: 0.375rem;
  box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, 0.1);
`;
const CardHeader = styled.div`
  padding: 1.5rem;
`;
const CardBody = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

function Card({ title, children }) {
  return (
    <>
      <CardWrap>
        {title && <CardHeader>{title}</CardHeader>}
        <CardBody>{children}</CardBody>
      </CardWrap>
    </>
  );
}
export default Card;
