import React from "react";
import BoardList from "../components/Board/BoardList";
import Card from "../components/Card";
import { Grid } from "../components/GlobalStyles";
import { ArrowRightSquare, Coin, PersonAdd, TicketPerforated } from "react-bootstrap-icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Alert from "../components/Alert";
import { Check } from "react-bootstrap-icons";

export const Member = styled.div`
  strong {
    display: block;
    font-size: 1.625rem;
    color: #5d596c;
    font-weight: 700;
    letter-spacing: -0.08rem;
    margin: -0.5rem 0 0.5rem;
  }
  div {
    font-size: 0.8rem;
    padding: 0.5rem 0 0;
  }
  .icon {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    font-size: 1.5rem;
    width: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    border-radius: 0.375rem;
    padding: 0;
    &.primary {
      background-color: var(--primaryLabel);
      color: var(--primary);
    }
    &.danger {
      background-color: var(--dangerLabel);
      color: var(--danger);
    }
    &.warning {
      background-color: var(--warningLabel);
      color: var(--warning);
    }
    &.info {
      background-color: var(--infoLabel);
      color: var(--info);
    }
    &.success {
      background-color: var(--successLabel);
      color: var(--success);
    }
  }
`;

const Salary = () => {
  const { allSalaryInfo, allUserInfo } = useSelector((state) => state.salaryAdminSlice)
  const [showDialog, setShowDialog] = useState(false);
  const totalSalary = allSalaryInfo?.reduce((a, currentItem) => {
    return a + parseInt(currentItem.salary, 10);
  }, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showDialog]);
  return (
    <div>
      <Grid $col="4" className="mb3">
        <Card title={"Members"}>
          <Member>
            <strong>{allUserInfo?.length}</strong>
            <div>총 직원수</div>
            <div className="icon primary">
              <PersonAdd />
            </div>
          </Member>
        </Card>
        <Card title={"Expenditure Salary"}>
          <Member>
            {totalSalary ? <strong>{totalSalary.toLocaleString()}원</strong> : <strong>0원</strong>}
            <div>이번 달 지출 급여</div>
            <div className="icon warning">
              <Coin />
            </div>
          </Member>
        </Card>
        <Card title={"Request Attendance"}>
          <Member>
            <strong>5</strong>
            <div>근태 신청자수</div>
            <div className="icon danger">
              <ArrowRightSquare />
            </div>
          </Member>
        </Card>
        <Card title={"Ongoing Project"}>
          <Member>
            <strong>10</strong>
            <div>진행중인 프로젝트 수</div>
            <div className="icon info">
              <TicketPerforated />
            </div>
          </Member>
        </Card>
      </Grid>
      {showDialog && (
        <Alert color="success" close title="급여 수정이 완료되었습니다">
          <Check />
        </Alert>
      )}
      <Card title={"Member Salary List"}>
        <BoardList state={"salary"} setShowDialog={setShowDialog} />
      </Card>
    </div>
  );
};

export default Salary;
