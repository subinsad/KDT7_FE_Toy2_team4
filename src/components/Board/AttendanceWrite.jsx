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

const AttendanceWrite = () => {
  const navigate = useNavigate();
  const Back = () => {
    navigate("/attendance");
  };
  return (
    <>
      <Card title={"근태신청"}>
        <Grid $col="3" className="mb3">
          <div>
            <Input type="text" plainText label="Name" labelText="Name" readOnly="readonly" value="아무개" />
          </div>
          <div>
            <Input type="text" plainText label="job" labelText="Job Position" readOnly="readonly" value="과장" />
          </div>
          <div>
            <Input type="text" plainText label="job" labelText="남은 휴가일수" readOnly="readonly" value="8 / 10" />
          </div>
          <RadioGroup title="근태종류">
            <Radio value="유급휴가" id="ra3_1" name="rag3_2" color="primary" />
            <Radio value="무급휴가" checked={true} id="ra3_2" name="rag3_2" color="primary" />
            <Radio value="조퇴" id="ra3_3" name="rag3_2" color="warning" />
            <Radio value="경조사" id="ra3_4" name="rag3_2" color="danger" />
            <Radio value="기타" id="ra3_5" name="rag3_2" color="secondary" />
          </RadioGroup>
          <div>
            <Input type="date" label="startdate" labelText="근태 시작일" />
          </div>
          <div>
            <Input type="date" label="enddate" labelText="근태 종료일" />
          </div>
          <GridColumnSpan $span="3">
            <Editor title="근태내용"></Editor>
          </GridColumnSpan>
        </Grid>
        <hr />
        <div className="align both">
          <Button $color="secondary" onClick={Back}>
            리스트
          </Button>
          <Button $color="primary">근태신청</Button>
        </div>
      </Card>
    </>
  );
};

export default AttendanceWrite;
