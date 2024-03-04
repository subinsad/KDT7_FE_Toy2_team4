import React from "react";
import Card from "../Card";
import { Button, Grid, GridColumnSpan } from "../GlobalStyles";
import Select from "../Select";
import Input from "../Input";
import Radio, { RadioGroup } from "../Radio";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor";
const optionMember = [
  {
    value: "member1",
    text: "팀원1",
  },
  {
    value: "member2",
    text: "팀원2",
  },
  {
    value: "member3",
    text: "팀원3",
  },
  {
    value: "member4",
    text: "팀원4",
  },
];

const AttendanceRead = () => {
  const navigate = useNavigate();
  const Back = () => {
    navigate("/attendance");
  };
  return (
    <>
      <Card title={"근태신청"}>
        <Grid $col="3" className="mb3">
          <div>
            <Input type="text" plainText label="job0" labelText="Name" readOnly="readonly" value="아무개" />
          </div>
          <div>
            <Input type="text" plainText label="job1" labelText="Job Position" readOnly="readonly" value="과장" />
          </div>
          <div>
            <Input type="text" plainText label="job2" labelText="남은 휴가일수" readOnly="readonly" value="8 / 10" />
          </div>
          <div>
            <Input type="text" plainText label="job3" labelText="근태종류" readOnly="readonly" value="유급휴가" />
          </div>
          <div>
            <Input type="text" plainText label="job4" labelText="근태 시작일" readOnly="readonly" value="2024-03-21" />
          </div>
          <div>
            <Input type="text" plainText label="job5" labelText="근태 종료일" readOnly="readonly" value="2024-03-25" />
          </div>
          <GridColumnSpan $span="3">
            <hr />
            근태 내용삽입
          </GridColumnSpan>
        </Grid>
        <hr />
        <div className="align both">
          <Button $color="secondary" onClick={Back}>
            이전
          </Button>
          <div>
            <Button $color="primary" className="mr2">
              승인
            </Button>
            <Button $color="danger">반려</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AttendanceRead;
