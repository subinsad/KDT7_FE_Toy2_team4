import React from "react";
import Card from "../components/Card";
import BoardList from "../components/Board/BoardList";
import { Button } from "../components/GlobalStyles";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate("/attendance/write");
  };
  return (
    <div>
      <Card title={"Member Salary List"}>
        <div className="align right mb3">
          <Button $color="primary" onClick={gotoWrite}>
            근태신청
          </Button>
        </div>
        <BoardList state={"attendance"} />
      </Card>
    </div>
  );
};

export default Attendance;
