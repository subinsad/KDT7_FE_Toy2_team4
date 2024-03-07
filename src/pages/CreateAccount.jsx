import Heading from "../components/Heading";
import Input from "../components/Input";
import { Button, FormText, Grid, GridColumnSpan } from "../components/GlobalStyles";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Camera, ChatLeftHeart, CheckSquareFill, HouseFill, PeopleFill } from "react-bootstrap-icons";
import { useState } from "react";
import Select from "../components/Select";
import EmailGroup from "../components/EmailGroup";
import Avatar from "../components/Avatar";
import accountImg from "../assets/picture2.png";
import mypageHeader from "../assets/bg_profile.png";

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

const rotate = keyframes`
  0% {
    transform: rotateY(0);
  }
  80% {
    transform: rotateY(360deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const DoneJoin = styled.div`
  line-height: 1.4;
  text-align: left;
  svg {
    display: block;
    margin: 0.5rem 0;
    font-size: 3rem;
    color: var(--danger);
    path:last-child {
      animation: ${rotate} infinite 1s;
      transform-box: fill-box;
      transform-origin: center;
    }
  }
  button {
    margin-top: 1rem;
  }
`;

const SignHeader = styled.div``;
const SampleMypage = styled.div`
  position: relative;
  .skeleton {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr min-content;
    gap: 0.5rem 1rem;
    padding: 0.5rem;
    margin-top: -2rem;
    > div {
      background-color: var(--secondary);
      opacity: 0.2;
    }
    &__name {
      width: 5rem;
      height: 1rem;
      align-self: end;
    }
    &__info {
      width: 10rem;
      height: 0.5rem;
    }
  }
  button {
    grid-row: span 2;
    border-radius: 0.375rem;
    width: 5rem;
    height: 5rem;
    pointer-events: none;
    cursor: auto;
  }
  img {
    width: 100%;
  }
`;

const optionTeam = [
  {
    value: "team0",
    text: "기획팀",
  },
  {
    value: "team1",
    text: "개발팀",
  },
  {
    value: "team2",
    text: "디자인팀",
  },
  {
    value: "team3",
    text: "운영팀",
  },
  {
    value: "team4",
    text: "회계팀",
  },
];
const optionPosition = [
  {
    value: "position1",
    text: "인턴",
  },
  {
    value: "position2",
    text: "사원",
  },
  {
    value: "position3",
    text: "대리",
  },
  {
    value: "position4",
    text: "과장",
  },
  {
    value: "position5",
    text: "팀장",
  },
  {
    value: "position6",
    text: "차장",
  },
  {
    value: "position7",
    text: "부장",
  },
];
const optionMail = [
  {
    value: "select1",
    text: "gmail.com",
  },
  {
    value: "select2",
    text: "kakao.com",
  },
  {
    value: "select3",
    text: "naver.com",
  },
];

const CreateAccount = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const nextPage = () => {
    setActiveStep(activeStep + 1);
  };
  const prevPage = () => {
    setActiveStep(activeStep - 1);
  };
  const gotoLogin = () => {
    navigate("/login");
  };
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
          <>
            <SignHeader>
              <Heading size={"sm"} tag={"h2"}>
                계정정보 입력
              </Heading>
              <p className="mb3">회원가입에 필요한 자세한 정보를 입력하세요.</p>
            </SignHeader>
            <Grid $col="2" className="mb3">
              <div>
                <Input type="text" label="username" labelText="Username" />
                <FormText $error>이름을 입력해 주세요.</FormText>
              </div>
              <div>
                <EmailGroup title="Email">
                  <Input type="text" />
                  <Select options={optionMail} />
                </EmailGroup>
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
          </>
        )}
        {activeStep === 1 && (
          <>
            <SignHeader>
              <Heading size={"sm"} tag={"h2"}>
                개인정보 입력
              </Heading>
              <p className="mb3">회원가입에 필요한 자세한 정보를 입력하세요.</p>
            </SignHeader>
            <Grid $col="2" className="mb3">
              <div>
                <Select options={optionTeam} label="team" labelText="Team" />
                <FormText $error>소속을 선택해 주세요.</FormText>
              </div>
              <div>
                <Select options={optionPosition} label="team" labelText="Job Position" />
                <FormText $error>직급을 입력해주세요.</FormText>
              </div>
              <div>
                <Input type="tel" label="tel" labelText="Phone" placeholder="000-0000-0000" />
                <FormText $error>휴대폰번호를 입력해 주세요.</FormText>
              </div>
              <div>
                <Input type="text" label="shortInfo" labelText="Short Words" placeholder="프로필 한줄 소개" />
                <FormText $error>프로필 한줄글을 입력해주세요.</FormText>
              </div>
            </Grid>
          </>
        )}
        {activeStep === 2 && (
          <>
            <SignHeader>
              <Heading size={"sm"} tag={"h2"}>
                사진 업로드
              </Heading>
              <p className="mb3">본인 인증을 위한 사진을 업로드하세요.</p>
            </SignHeader>
            <Grid $col="2" className="mb3">
              <GridColumnSpan $span="2">
                <SampleMypage>
                  <img src={mypageHeader} alt="" />
                  <div className="skeleton">
                    <Avatar $size="md" />
                    <div className="skeleton__name"></div>
                    <div className="skeleton__info"></div>
                  </div>
                </SampleMypage>
              </GridColumnSpan>
              <div>
                <Input type="file" label="file1" labelText="Profile Image" />
                <FormText $error>프로필 사진을 올려주세요.</FormText>
              </div>
              <div>
                <Input type="file" label="file2" labelText="Mypage Background Image" />
                <FormText $error>마이페이지 배경이미지를 올려주세요.</FormText>
              </div>
            </Grid>
          </>
        )}

        {activeStep === 3 && (
          <>
            <Heading size={"sm"} tag={"h2"}>
              회원가입 완료
            </Heading>
            <DoneJoin className="mb3">
              <ChatLeftHeart />
              4U Team의 일원이 되신것을 환영합니다.
              <br />
              함께 성장하고 꿈을 이뤄봅시다.
              <br />
              로그인하고 꿈을 펼처보세요.
              <br />
              <Button $color="primary" onClick={gotoLogin}>
                로그인
              </Button>
            </DoneJoin>
          </>
        )}
        {activeStep !== 3 && (
          <div className="align both">
            <Button $color="secondary" disabled={activeStep === 0 && `disabled`} onClick={prevPage}>
              이전
            </Button>
            <Button $color="primary" onClick={nextPage}>
              다음
            </Button>
          </div>
        )}
      </SignRight>
    </SignWrap>
  );
};

export default CreateAccount;
