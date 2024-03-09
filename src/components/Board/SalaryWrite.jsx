import React from "react";
import Card from "../Card";
import Input from "../Input";
import { Button, FormText, Grid } from "../GlobalStyles";
import Radio, { RadioGroup } from "../Radio";
import Select from "../Select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Dialog from "../Dialog";
import Alert from "../Alert";
import { Check } from "react-bootstrap-icons";

const SalaryWrite = () => {
  const { userInfo } = useSelector((state) => state.salaryAdminSlice);
  const [selectUser, setSelectUser] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    user: "",
    type: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const optionMember = [
    { value: "default", text: "선택하세요" },
    ...userInfo.map((user) => ({ value: user.uid, text: user.name })),
  ];

  const navigate = useNavigate();

  const Back = () => {
    navigate("/salaryAdmin");
  };

  const checkForm = () => {
    let isValid = true;
    if (!selectUser || selectUser === "default") {
      setErrorMessage((prevData) => ({
        ...prevData,
        user: "급여를 지급 할 직원을 선택해주세요.",
      }));
      isValid = false;
    }
    if (!type) {
      setErrorMessage((prevData) => ({
        ...prevData,
        type: "급여 종류를 선택해주세요.",
      }));
      isValid = false;
    }
    if (!salary.trim()) {
      setErrorMessage((prevData) => ({
        ...prevData,
        salary: "지급 할 금액을 입력해주세요.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const onSubmit = async () => {
    const isValidForm = checkForm();
    if (isValidForm) {
      try {
        setLoading(true);
        const userSalaryDocRef = doc(
          db,
          "users",
          getSelectedUser().uid,
          "salary",
          "data"
        );
        await setDoc(
          userSalaryDocRef,
          {
            [type]: salary,
          },
          { merge: true }
        );
        setShowDialog(true);
        setSelectUser("default");
        setSalary("");
        setType("");
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false)
      }

    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage((prevMessages) => ({
        ...prevMessages,
        user: "",
        type: "",
        salary: "",
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showDialog]);

  const getSelectedUser = () => {
    return userInfo.find((user) => user.uid === selectUser) || {};
  };


  return (
    <div>
      {showDialog && (
        <Alert color="success" close title="급여 지급이 완료되었습니다">
          <Check />
        </Alert>
      )}
      {loading && <Loading />}
      <Card title={"급여지급 설정"}>
        <Grid $col="2" className="mb3">
          <div>
            <Select
              options={optionMember}
              label="member"
              labelText="Member"
              onChange={(e) => setSelectUser(e.target.value)}
              value={selectUser}
            />
            {errorMessage.user && <FormText $error>{errorMessage.user}</FormText>}
          </div>
          <div>
            <Input
              type="text"
              plainText
              label="job"
              labelText="Job Position"
              readOnly="readonly"
              value={getSelectedUser()?.position || ""}
            />
          </div>
          <div>
            <RadioGroup title="Category">
              <Radio
                value="기본급여"
                id="ra2_1"
                name="rag2_2"
                color="primary"
                checked={type === "baseSalary"}
                onChange={() => setType("baseSalary")}
              />
              <Radio
                value="성과급"
                id="ra2_2"
                name="rag2_2"
                color="primary"
                checked={type === "bonusSalary"}
                onChange={() => setType("bonusSalary")}
              />
              <Radio
                value="특수보너스"
                id="ra2_3"
                name="rag2_2"
                color="primary"
                checked={type === "specialSalary"}
                onChange={() => setType("specialSalary")}
              />
            </RadioGroup>
            {errorMessage.type && (
              <FormText $error>{errorMessage.type}</FormText>
            )}
          </div>
          <div>
            <Input
              type="number"
              label="cost"
              labelText="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            {errorMessage.salary && (
              <FormText $error>{errorMessage.salary}</FormText>
            )}
          </div>
        </Grid>
        <hr />
        <div className="align both">
          <Button $color="secondary" onClick={Back}>
            이전
          </Button>
          <Button $color="primary" onClick={onSubmit} popovertarget="dialog">
            급여지급
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SalaryWrite;