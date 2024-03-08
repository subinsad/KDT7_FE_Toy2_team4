import React from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { Button, FormText } from "../components/GlobalStyles";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import loginImg from "../assets/picture1.png";
import EmailGroup from "../components/EmailGroup";
import Select from "../components/Select";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo } from "../store/signInfo.slice";
import { useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchUserInfo } from "../store/user.slice";
import { useSelector } from "react-redux";

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
    value: "default",
    text: "선택",
  },
  {
    value: "naver.com",
    text: "naver.com",
  },
  {
    value: "gmail.com",
    text: "gmail.com",
  },
  {
    value: "kakao.com",
    text: "kakao.com",
  },
];

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSlice)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  })

  const handlePassword = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else {
      const { value } = e.target;
      setPassword(value);
    }
  }
  const handleEmail = (e) => {
    const { value } = e.target
    setEmail(value)
  }
  const selectEmail = (e) => {
    const pickEmail = e.target.value;
    if (pickEmail === "default") return
    else {
      setEmail(email.split('@')[0] + '@' + pickEmail)
    }
  }

  const checkForm = () => {
    let isValid = true;
    if (!email) {
      setErrorMessage((prevData) => ({
        ...prevData,
        email: "이메일을 입력해주세요."
      }));
      isValid = false;
    }
    if (!password) {
      setErrorMessage((prevData) => ({
        ...prevData,
        password: "비밀번호를 입력해주세요."
      }));
      isValid = false;
    }
    return isValid;
  }

  const onSubmit = async (e) => {
    const isValidForm = checkForm();
    if (isValidForm) {
      try {
        setLoading(true);
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        dispatch(fetchUserInfo(user))
        navigate("/main");
      } catch (error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!userInfo.name) {
      dispatch(clearUserInfo());
      return;
    }
    navigate("/main");
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage((prevMessages) => ({
        ...prevMessages,
        email: "",
        password: "",
      }));
      setError("")
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, error]);


  return (
    <>
      {loading && (<Loading />)}
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
              <Input type="text" onChange={handleEmail} />
              <Select options={optionMail} onChange={selectEmail} />
            </EmailGroup>
            {errorMessage.email && (<FormText $error>{errorMessage.email}</FormText>)}
          </div>
          <div>
            <Input type="password" label="Password" labelText="Password" showPassword onChange={handlePassword} />
            {errorMessage.password && (<FormText $error>{errorMessage.password}</FormText>)}
          </div>
          <div>
            <Checkbox value="Remember Me" id="id1" color="primary" />
          </div>
          {error && (<FormText $error>{error}</FormText>)}
          <div>
            <Button $color="primary" onClick={onSubmit}>Sign in</Button>
          </div>
          <div className="guide-account">
            계정이 없으신가요? <Link to="/create-account">계정 만들기</Link>
          </div>
        </LoginInner>
      </LoginWrap>
    </>
  );
};

export default Login;
