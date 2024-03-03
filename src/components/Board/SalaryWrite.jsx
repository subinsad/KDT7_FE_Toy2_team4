import React from "react";
import Card from "../Card";
import Input from "../Input";
import { Button, Grid, GridColumnSpan } from "../GlobalStyles";
import Radio, { RadioGroup } from "../Radio";
import Select from "../Select";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const Back = () => {
    navigate("/salary");
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
            <Radio value="급여" checked={true} id="ra1" name="rag2_1" color="primary" />
            <Radio value="보너스" id="ra2" name="rag2_1" color="primary" />
            <Radio value="성과급" id="ra3" name="rag2_1" color="primary" />
          </RadioGroup>
          <div>
            <Input type="text" label="cost" labelText="Salary" value="1,000,000" />
          </div>
        </Grid>
        <hr />
        <div className="align both">
          <Button $color="secondary" onClick={Back}>
            List
          </Button>
          <Button $color="primary">Submit</Button>
        </div>
      </Card>
    </div>
  );
};

export default SalaryWrite;
