import React, { useEffect } from "react";
import { Grid, GridColumnSpan } from "../components/GlobalStyles";
import Card from "../components/Card";
import { ArrowRightSquare, Coin, PersonAdd, TicketDetailed, TicketPerforated } from "react-bootstrap-icons";
import { Member } from "./Salary";
import BoardList from "../components/Board/BoardList";
import Work from "./Work";
import Aos from "aos";
import "aos/dist/aos.css";
import Slide from "../components/Slide";

const Main = () => {
  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  return (
    <div>
      <Grid $col="2" className="mb3">
        <GridColumnSpan $span="2" data-aos="fade-top" data-aos-delay="200">
          <Slide />
        </GridColumnSpan>
        {/* <Card title={"Members"} data-aos="fade-up">
          <Member>
            <strong>12</strong>
            <div>총 직원수</div>
            <div className="icon primary">
              <PersonAdd />
            </div>
          </Member>
        </Card>
        <Card title={"Request Attendance"} data-aos="fade-up" data-aos-delay="200">
          <Member>
            <strong>5</strong>
            <div>근태 신청자수</div>
            <div className="icon danger">
              <ArrowRightSquare />
            </div>
          </Member>
        </Card>
        <Card title={"Ongoing Project"} data-aos="fade-up" data-aos-delay="400">
          <Member>
            <strong>10</strong>
            <div>진행중인 프로젝트 수</div>
            <div className="icon info">
              <TicketPerforated />
            </div>
          </Member>
        </Card>
        <Card title={"OnReady Project"} data-aos="fade-up" data-aos-delay="600">
          <Member>
            <strong>152</strong>
            <div>대기중인 프로젝트 수</div>
            <div className="icon success">
              <TicketDetailed />
            </div>
          </Member>
        </Card> */}
        <GridColumnSpan data-aos="fade-right" data-aos-delay="400">
          <Card title={"Attendance State"}>
            <BoardList state="attendance" />
          </Card>
        </GridColumnSpan>
        <GridColumnSpan data-aos="fade-left" data-aos-delay="600">
          <Work />
        </GridColumnSpan>
      </Grid>
    </div>
  );
};

export default Main;
