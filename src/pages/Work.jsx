import moment from "momnet";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

import date from "../assets/data/date";

const CalendarWrap = styled(Card)`
  overflow: hidden;
  > div {
    padding: 0;
  }
  .fc {
    .fc-theme-standard {
      th {
        > div {
          padding: 5px;
          font-size: 0.9rem;
          font-weight: 700;
        }
      }
    }

    .fc-daygrid-day-frame {
      padding: 0.5rem 2px;
    }
    .fc-h-event {
      padding: 0.216rem 0.5rem;
      font-size: 0.8125rem;
      &[style*="255, 241, 227"] {
        div {
          color: var(--warning) !important;
        }
      }
      &[style*="223, 247, 233"] {
        div {
          color: var(--success) !important;
        }
      }
      &[style*="217, 248, 252"] {
        div {
          color: var(--info) !important;
        }
      }
      &[style*="234, 232, 253"] {
        div {
          color: var(--primary) !important;
        }
      }
    }
    .fc-button {
      padding: 0;
      width: 20px;
      height: 20px;
      .fc-icon {
        font-size: 0;
      }
    }
    .fc-button-primary {
      background: none;
      border: none;
      outline: none;
      &:not(:disabled):active {
        border: none;
        background: none;
        box-shadow: none;
      }
      &:focus {
        box-shadow: none;
      }
    }
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
    .fc-daygrid-day.fc-day-today {
      background-color: #dbdade;
    }
    .fc-today-button {
      width: auto;
      color: var(--primary);
      &:disabled {
        color: var(--primary);
        opacity: 0.8;
      }
    }
    .fc-toolbar {
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      align-items: center;
    }
    .fc-button-group > .fc-button {
      flex: none;
    }
  }

  .fc-next-button {
    padding: 1rem;
  }
  .fc-icon-chevron-left::before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg>');
  }
  .fc-icon-chevron-right::before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>');
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
            var dateStr = prompt("YYYY-MM-DD 형식으로 입력하세요.");
            var date = new Date(dateStr + "T00:00:00");

            if (!isNaN(date.valueOf())) {
              calendar.addEvent({
                title: "일정 삽입",
                start: date,
                allDay: true,
              });
              alert("Update DB...");
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
