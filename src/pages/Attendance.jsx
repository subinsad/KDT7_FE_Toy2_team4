import React, { useEffect } from "react";
import Card from "../components/Card";
import BoardList from "../components/Board/BoardList";
import { Button } from "../components/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";

const Attendance = () => {
  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate("/attendance/write");
  };

  const { isAdmin } = useSelector((state) => state.userSlice);
  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);
  return (
    <div>
      <Card title={"Member Salary List"} data-aos="fade-in" data-aos-delay="200">
        <div className="align right mb3">
          {!isAdmin && (
            <Button $color="primary" onClick={gotoWrite} data-aos="fade-left" data-aos-delay="400">
              근태신청
            </Button>
          )}
        </div>
        <BoardList state={"attendance"} />
      </Card>
    </div>
  );
};

export default Attendance;
