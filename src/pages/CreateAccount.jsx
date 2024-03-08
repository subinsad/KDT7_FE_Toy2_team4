import styled from "styled-components";
import { Camera, CheckSquareFill, HouseFill, PeopleFill } from "react-bootstrap-icons";
import { useState } from "react";
import accountImg from "../assets/picture2.png";
import JoinFirst from "../components/signComponents/JoinFirst";
import JoinSecond from "../components/signComponents/JoinSecond";
import JoinComplete from "../components/signComponents/JoinComplete";
import JoinThird from "../components/signComponents/JoinThird";

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
  grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
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
      left: -28px;
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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <SignWrap>
      <SignLeft>
        <img src={accountImg} alt="" />
      </SignLeft>
      <SignRight>
        <Step>
          <StepItem $active={activeStep === 0 && `$active`}>
            <span>
              <HouseFill />
            </span>
            <strong>Account</strong>
            <p>계정정보 입력</p>
          </StepItem>
          <StepItem $active={activeStep === 1 && `$active`}>
            <span>
              <PeopleFill />
            </span>
            <strong>Personal</strong>
            <p>개인정보 입력</p>
          </StepItem>
          <StepItem $active={activeStep === 2 && `$active`}>
            <span>
              <Camera />
            </span>
            <strong>Personal</strong>
            <p>사진 업로드</p>
          </StepItem>
          <StepItem $active={activeStep === 3 && `$active`}>
            <span>
              <CheckSquareFill />
            </span>
            <strong>Done</strong>
            <p>회원가입완료</p>
          </StepItem>
        </Step>
        {activeStep === 0 && (
          <JoinFirst setActiveStep={setActiveStep} />
        )}
        {activeStep === 1 && (
          <JoinSecond setActiveStep={setActiveStep} />
        )}
        {activeStep === 2 && (
          <JoinThird setActiveStep={setActiveStep} />
        )}
        {activeStep === 3 && (
          <JoinComplete />
        )}
      </SignRight>
    </SignWrap>
  );
};

export default CreateAccount;
