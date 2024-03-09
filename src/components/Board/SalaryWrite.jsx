import React from "react";
import Card from "../Card";
import Input from "../Input";
import { Button, Grid, GridColumnSpan } from "../GlobalStyles";
import Radio, { RadioGroup } from "../Radio";
import Select from "../Select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

const SalaryWrite = () => {
  const { isAdmin } = useSelector((state) => state.userSlice)
  const navigate = useNavigate();
  const Back = () => {
    if(isAdmin){
      navigate("/salaryAdmin");
    }
    else{
      navigate("/salary");
    }
  };
  return (
    <div>
      <Card title={"급여지급 설정"}>
        <Grid $col="2" className="mb3">
          <div>
            <Select options={optionMember} label="member" labelText="Member" />
          </div>
          <div>
            <Input type="text" plainText label="job" labelText="Job Position" readOnly="readonly" value="과장" />
          </div>
          <RadioGroup title="Category">
            <Radio value="급여" checked={true} id="ra2_1" name="rag2_2" color="primary" />
            <Radio value="성과급" id="ra2_2" name="rag2_2" color="primary" />
            <Radio value="특수보너스" id="ra2_3" name="rag2_2" color="primary" />
          </RadioGroup>
          <div>
            <Input type="text" label="cost" labelText="Salary" value="1,000,000" />
          </div>
        </Grid>
        <hr />
        <div className="align both">
          <Button $color="secondary" onClick={Back}>
            이전
          </Button>
          <Button $color="primary">급여지급</Button>
        </div>
      </Card>
    </div>
  );
};

export default SalaryWrite;
