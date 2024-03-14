import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { FormText, Grid } from "../../components/GlobalStyles";
import Select from "../../components/Select";
import Avatar from "../../components/Avatar";
import styled from "styled-components";
import { Button } from "../../components/GlobalStyles";
import { useState } from "react";
import { useEffect } from "react";
import { addUserInfo2 } from "../../store/signInfo.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SignHeader = styled.div`
  display: grid;
  align-items: center;
  gap: 0.2rem 0.5rem;
  button {
    grid-column: 1/2;
    grid-row: 1/3;
    align-self: start;
  }
`;

const optionTeam = [
  {
    value: "default",
    text: "팀 선택",
  },
  {
    value: "기획팀",
    text: "기획팀",
  },
  {
    value: "개발팀",
    text: "개발팀",
  },
  {
    value: "디자인팀",
    text: "디자인팀",
  },
  {
    value: "운영팀",
    text: "운영팀",
  },
];
const optionPosition = [
  {
    value: "default",
    text: "직급 선택",
  },
  {
    value: "인턴",
    text: "인턴",
  },
  {
    value: "사원",
    text: "사원",
  },
  {
    value: "대리",
    text: "대리",
  },
  {
    value: "과장",
    text: "과장",
  },
  {
    value: "팀장",
    text: "팀장",
  },
];

const JoinSecond = ({ setActiveStep }) => {
  const dispatch = useDispatch();
  const { team, position, phone, shortInfo } = useSelector((state) => state.signInfoSlice.signInfo);

  const [formData, setFormData] = useState({
    team: team || "",
    position: position || "",
    phone: phone || "",
    shortInfo: shortInfo || "",
  });

  const [errorMessage, setErrorMessage] = useState({
    team: "",
    position: "",
    phone: "",
    shortInfo: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const checkForm = () => {
    let isValid = true;
    if (!formData.team) {
      setErrorMessage((prevData) => ({
        ...prevData,
        team: "팀을 선택해주세요.",
      }));
      isValid = false;
    }
    if (!formData.position) {
      setErrorMessage((prevData) => ({
        ...prevData,
        position: "직급을 선택해주세요.",
      }));
      isValid = false;
    }
    if (!formData.phone) {
      setErrorMessage((prevData) => ({
        ...prevData,
        phone: "핸드폰 번호를 입력해주세요.",
      }));
      isValid = false;
    } else if (!/^[0-9-]*$/.test(formData.phone)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        phone: "숫자만 입력해주세요.",
      }));
      isValid = false;
    }
    if (!formData.shortInfo) {
      setErrorMessage((prevData) => ({
        ...prevData,
        shortInfo: "한 줄 소개를 입력해주세요.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handlePrev = () => {
    dispatch(
      addUserInfo2({
        team: formData.team || "",
        position: formData.position || "",
        phone: formData.phone || "",
        shortInfo: formData.shortInfo || "",
      })
    );
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = async () => {
    const isValidForm = checkForm();
    if (isValidForm) {
      dispatch(
        addUserInfo2({
          team: formData.team,
          position: formData.position,
          phone: formData.phone,
          shortInfo: formData.shortInfo,
        })
      );
      setActiveStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage((prevMessages) => ({
        ...prevMessages,
        team: "",
        position: "",
        phone: "",
        shortInfo: "",
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <SignHeader>
        <Heading size={"sm"} tag={"h2"}>
          개인정보 입력
        </Heading>
        <p className="mb3">회원가입에 필요한 자세한 정보를 입력하세요.</p>
      </SignHeader>
      <Grid $col="2" className="mb3">
        <div>
          <Select id="team" options={optionTeam} label="team" labelText="Team" onChange={handleChange} defaultValue={formData.team} />
          {errorMessage.team && <FormText $error>{errorMessage.team}</FormText>}
        </div>
        <div>
          <Select id="position" options={optionPosition} label="position" labelText="Job Position" onChange={handleChange} defaultValue={formData.position} />
          {errorMessage.position && <FormText $error>{errorMessage.position}</FormText>}
        </div>
        <div>
          <Input autoComplete="off" id="phone" type="tel" label="tel" labelText="Phone" placeholder="000-0000-0000" onChange={handleChange} defaultValue={formData.phone} />
          {errorMessage.phone && <FormText $error>{errorMessage.phone}</FormText>}
        </div>
        <div>
          <Input autoComplete="off" id="shortInfo" type="text" label="shortInfo" labelText="Short Words" placeholder="프로필 한줄 소개" onChange={handleChange} defaultValue={formData.shortInfo} />
          {errorMessage.shortInfo && <FormText $error>{errorMessage.shortInfo}</FormText>}
        </div>
      </Grid>

      <div className="align both">
        <Button $color="secondary" onClick={handlePrev}>
          이전
        </Button>
        <Button $color="primary" onClick={handleNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default JoinSecond;
