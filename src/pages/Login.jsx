import React from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { Button } from "../components/GlobalStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import loginImg from "../assets/picture1.png";
import EmailGroup from "../components/EmailGroup";
import Select from "../components/Select";

const LoginWrap = styled.div`
  display: grid;
  grid-template-columns: 55% 1fr;
  height: 100vh;
  align-items: center;
  background-color: #fff;
`;
const LoginLeft = styled.div`
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
const LoginInner = styled.div`
  width: 400px;
  justify-self: center;
  display: grid;
  gap: 1rem;
  p {
    font-size: 0.8rem;
    padding: 0 0 0.5rem;
  }
  Button {
    width: 100%;
  }
  .guide-account {
    text-align: center;
    font-size: 0.85rem;
    a {
      color: var(--primary);
    }
  }
  h2 {
    margin-bottom: -0.5rem;
  }
`;
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
const Login = () => {
  return (
    <LoginWrap>
      <LoginLeft>
        <img src={loginImg} alt="" />
      </LoginLeft>
      <LoginInner>
        <img src={logo} alt="" />
        <Heading tag={"h2"} size={"sm"}>
          Welcome to 4U Team Intranet! 👋
        </Heading>
        <p>계정을 생성하고 4U Team 인트라넷 모험을 떠나보세요!</p>
        <div>
          <EmailGroup title="email">
            <Input type="text" />
            <Select options={optionMail} />
          </EmailGroup>
        </div>
        <div>
          <Input type="password" label="Password" labelText="Password" showPassword />
        </div>
        <div>
          <Checkbox value="Remember Me" id="id1" color="primary" />
        </div>
        <div>
          <Button $color="primary">Sign in</Button>
        </div>
        <div className="guide-account">
          계정이 없으신가요? <Link to="/create-account">계정 만들기</Link>
        </div>
      </LoginInner>
    </LoginWrap>
  );
};

export default Login;
