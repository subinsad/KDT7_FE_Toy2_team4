import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { FormText, Grid } from "../../components/GlobalStyles";
import Select from "../../components/Select";
import EmailGroup from "../../components/EmailGroup";
import Avatar from "../../components/Avatar";
import styled from "styled-components";
import { Button } from "../../components/GlobalStyles";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserInfo1 } from "../../store/signInfo.slice";
import { useSelector } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

const SignHeader = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 0.2rem 0.5rem;
  button {
    grid-column: 1/2;
    grid-row: 1/3;
    align-self: start;
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

const JoinFirst = ({ setActiveStep }) => {
  const dispatch = useDispatch();
  const { name, password, email } = useSelector((state) => state.signInfoSlice.signInfo);

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    password: password || "",
    passwordConfirm: password || "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEmail = (e) => {
    const pickEmail = e.target.value;
    if (pickEmail === "default") return;
    setFormData((prevData) => ({
      ...prevData,
      email: formData.email.split("@")[0] + "@" + pickEmail,
    }));
  };

  const checkEmail = async () => {
    const { email } = formData;
    const userEmailRef = ref(storage, `UserEmail/${email}`);
    try {
      await getDownloadURL(userEmailRef);
      return false;
    } catch (error) {
      return true;
    }
  };

  const checkForm = () => {
    let isValid = true;
    if (!formData.name) {
      setErrorMessage((prevData) => ({
        ...prevData,
        name: "이름을 입력해 주세요.",
      }));
      isValid = false;
    }

    const checkForm = () => {
      let isValid = true;
      if (!formData.name) {
        setErrorMessage((prevData) => ({
          ...prevData,
          name: "이름을 입력해 주세요.",
        }));
        isValid = false;
      }
      if (!formData.email) {
        setErrorMessage((prevData) => ({
          ...prevData,
          email: "이메일을 입력해주세요.",
        }));
        isValid = false;
      } else if (!formData.email.includes("@")) {
        setErrorMessage((prevData) => ({
          ...prevData,
          email: "이메일을 선택해주세요",
        }));
        isValid = false;
      } else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(formData.email)) {
        setErrorMessage((prevData) => ({
          ...prevData,
          email: "이메일을 확인해주세요",
        }));
        isValid = false;
      } else if ((formData.email.match(/@/g) || []).length !== 1) {
        setErrorMessage((prevData) => ({
          ...prevData,
          email: "이메일을 확인해주세요",
        }));
        isValid = false;
      }
      if (!formData.password) {
        setErrorMessage((prevData) => ({
          ...prevData,
          password: "비밀번호를 입력해주세요.",
        }));
        isValid = false;
      }
      if (formData.password.length < 6) {
        setErrorMessage((prevData) => ({
          ...prevData,
          password: "비밀번호는 6자 이상이여야 합니다.",
        }));
        isValid = false;
      }
      if (!formData.passwordConfirm) {
        setErrorMessage((prevData) => ({
          ...prevData,
          passwordConfirm: "비밀번호를 입력해주세요.",
        }));
        isValid = false;
      }
      if (formData.password !== formData.passwordConfirm) {
        setErrorMessage((prevData) => ({
          ...prevData,
          passwordConfirm: "비밀번호가 맞지 않습니다.",
        }));
        isValid = false;
      }
      return isValid;
    };
    if (!formData.password) {
      setErrorMessage((prevData) => ({
        ...prevData,
        password: "비밀번호를 입력해주세요.",
      }));
      isValid = false;
    }
    if (!formData.passwordConfirm) {
      setErrorMessage((prevData) => ({
        ...prevData,
        passwordConfirm: "비밀번호를 입력해주세요.",
      }));
      isValid = false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage((prevData) => ({
        ...prevData,
        passwordConfirm: "비밀번호가 맞지 않습니다.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleNext = async () => {
    const isValidForm = checkForm();
    if (isValidForm) {
      const emailCheck = await checkEmail();
      if (emailCheck) {
        dispatch(
          addUserInfo1({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        );
        setActiveStep((prev) => prev + 1);
      } else {
        setErrorMessage((prevData) => ({
          ...prevData,
          email: "해당 이메일이 이미 존재합니다.",
        }));
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage((prevMessages) => ({
        ...prevMessages,
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <SignHeader>
        <Avatar $size="md" />
        <Heading size={"sm"} tag={"h2"}>
          계정정보 입력
        </Heading>
        <p className="mb3">회원가입에 필요한 자세한 정보를 입력하세요.</p>
      </SignHeader>
      <Grid $col="2" className="mb3">
        <div>
          <Input autoComplete="off" placeholder="이름" type="text" label="username" value={formData.name} labelText="Username" id="name" onChange={handleChange} />
          {errorMessage.name && <FormText $error>{errorMessage.name}</FormText>}
        </div>
        <div>
          <EmailGroup title="Email">
            <Input autoComplete="off" placeholder="이메일" id="email" type="text" value={formData.email.split("@")[0]} onChange={handleChange} />
            <Select options={optionMail} onChange={handleEmail} />
          </EmailGroup>
          {errorMessage.email && <FormText $error>{errorMessage.email}</FormText>}
        </div>
        <div>
          <Input placeholder="비밀번호" id="password" type="password" value={formData.password} label="Password" labelText="Password" showPassword={true} onChange={handleChange} />
          {errorMessage.password && <FormText $error>{errorMessage.password}</FormText>}
        </div>
        <div>
          <Input placeholder="비밀번호 확인" id="passwordConfirm" type="password" value={formData.passwordConfirm} label="Password2" labelText="Confirm Password" showPassword={true} onChange={handleChange} />
          {errorMessage.passwordConfirm && <FormText $error>{errorMessage.passwordConfirm}</FormText>}
        </div>
      </Grid>

      <div className="align both">
        <Button $color="primary" onClick={handleNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default JoinFirst;
