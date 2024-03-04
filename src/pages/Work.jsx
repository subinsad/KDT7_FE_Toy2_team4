import moment from "momnet";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

import date from "../assets/data/date";
import Loading from "../components/Loading";

const CalendarWrap = styled(Card)`
  .fc-day-sun {
    .fc-daygrid-day-top {
      color: var(--danger);
    }
  }
  .fc-day-sat {
    .fc-daygrid-day-top {
      color: var(--info);
    }
  }
`;

const Work = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = document.querySelector(".calendar");

    const calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "addEventButton",
      },
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      locale: "ko",
      events: date,
      editable: true,
      selectable: true,
      customButtons: {
        addEventButton: {
          text: "일정삽입",
          click: function () {
            var dateStr = prompt("Enter a date in YYYY-MM-DD format");
            var date = new Date(dateStr + "T00:00:00");

            if (!isNaN(date.valueOf())) {
              calendar.addEvent({
                title: "dynamic event",
                start: date,
                allDay: true,
              });
              alert("Great. Now, update your database...");
            } else {
              alert("Invalid date.");
            }
          },
        },
      },
    });
    calendar.render();
    return () => {
      calendar.destroy();
    };
  }, []);
  return (
    <CalendarWrap>
      <div ref={calendarRef} className="calendar"></div>
    </CalendarWrap>
  );
};

export default Work;
