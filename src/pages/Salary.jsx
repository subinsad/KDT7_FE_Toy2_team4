import React from "react";
import BoardList from "../components/Board/BoardList";
import Card from "../components/Card";

const Salary = () => {
  return (
    <div>
      <Card title={"Member Salary List"}>
        <BoardList state={"salary"} />
      </Card>
    </div>
  );
};

export default Salary;
