import Heading from "../components/Heading";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { Button, FormText, Grid, GridColumnSpan } from "../components/GlobalStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { CheckSquareFill, HouseFill, PeopleFill } from "react-bootstrap-icons";

const SignWrap = styled.div`
  display: grid;
  grid-template-columns: 40% 1fr;
  height: 100vh;
  align-items: center;
  background-color: #fff;
`;
const SignLeft = styled.div`
  display: grid;
  align-items: center;
  border-radius: 1rem;
  height: calc(100% - 4rem);
  margin: 2rem;
  background-color: #f8f7fa;
  img {
    width: 60%;
    max-width: 500px;
    justify-self: center;
  }
`;
const SignRight = styled.div`
  display: grid;
  justify-self: center;
  align-items: center;
  width: 668px;
  h2 {
    font-weight: 700;
  }
`;
const Step = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 0 3rem;
`;
const StepItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  gap: 0 1rem;
  strong {
    color: #5d596c;
    font-size: 0.9rem;
    font-weight: 600;
  }
  p {
    color: #a5a3ae;
    font-size: 0.9rem;
  }
  span {
    grid-column: 1/2;
    grid-row: span 2;
    align-self: center;
    justify-self: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${(props) => (props.$active ? "var(--primary)" : "#f1f0f2")};
    color: ${(props) => (props.$active ? "#fff" : "#a5a3ae")};
    text-align: center;
    line-height: 2.5rem;
    font-size: 1.125rem;
    border-radius: 0.375rem;
  }
  + li {
    &::before {
      content: "";
      position: absolute;
      left: -32px;
      top: 50%;
      width: 7px;
      height: 7px;
      border-top: 2px solid;
      border-left: 2px solid;
      transform: rotate(135deg) translate(-35%, 35%);
      border-color: #a5a3ae;
    }
  }
`;
const CreateAccount = () => {
  return (
    <SignWrap>
      <SignLeft>
        <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/illustrations/auth-register-illustration-light.png" alt="" />
      </SignLeft>
      <SignRight>
        <Step>
          <StepItem $active>
            <span>
              <HouseFill />
            </span>
            <strong>Account</strong>
            <p>계정정보 입력</p>
          </StepItem>
          <StepItem>
            <span>
              <PeopleFill />
            </span>
            <strong>Personal</strong>
            <p>개인정보 입력</p>
          </StepItem>
          <StepItem>
            <span>
              <CheckSquareFill />
            </span>
            <strong>Done</strong>
            <p>회원가입완료</p>
          </StepItem>
        </Step>
        <Heading size={"sm"} tag={"h2"}>
          개인정보 입력
        </Heading>
        <p className="mb3">회원가입에 필요한 자세한 정보를 입력하세요.</p>
        <Grid $col="2" className="mb3">
          <div>
            <Input type="text" label="username" labelText="Username" />
            <FormText $error>이름을 입력해 주세요.</FormText>
          </div>
          <div>
            <Input type="email" label="Email" labelText="Email" />
            <FormText $error>이메일을 입력해 주세요.</FormText>
          </div>
          <div>
            <Input type="password" label="Password" labelText="Password" showPassword={true} />
            <FormText $error>비밀번호를 입력해주세요.</FormText>
          </div>
          <div>
            <Input type="password" label="Password2" labelText="Confirm Password" showPassword={true} />
            <FormText $error>비밀번호가 맞지 않습니다.</FormText>
          </div>
        </Grid>
        <div className="align both">
          <Button $color="secondary" disabled>
            이전
          </Button>
          <Button $color="primary">다음</Button>
        </div>
      </SignRight>
    </SignWrap>
  );
};

export default CreateAccount;
