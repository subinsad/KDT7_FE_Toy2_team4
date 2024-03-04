import React from "react";
import { Grid, GridColumnSpan } from "../components/GlobalStyles";
import Card from "../components/Card";
import { ArrowRightSquare, Coin, PersonAdd, TicketDetailed, TicketPerforated } from "react-bootstrap-icons";
import { Member } from "./Salary";
import BoardList from "../components/Board/BoardList";

const Main = () => {
  return (
    <div>
      <Grid $col="4" className="mb3">
        <Card title={"Members"}>
          <Member>
            <strong>12</strong>
            <div>총 직원수</div>
            <div className="icon primary">
              <PersonAdd />
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
        <Card title={"OnReady Project"}>
          <Member>
            <strong>152</strong>
            <div>대기중인 프로젝트 수</div>
            <div className="icon success">
              <TicketDetailed />
            </div>
          </Member>
        </Card>
        <GridColumnSpan $span="4">
          <Card title={"Project State"}>
            <BoardList state={"project"} />
          </Card>
        </GridColumnSpan>
        <GridColumnSpan $span="4">
          <Card title={"Attendance State"}>
            <BoardList state="attendance" />
          </Card>
        </GridColumnSpan>
      </Grid>
    </div>
  );
};

export default Main;
