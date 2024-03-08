import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

import date from "../data/date";
import Input from "../components/Input";
import WorkWrite from "../components/WorkWrite";

const CalendarWrap = styled(Card)`
  overflow: hidden;
  > div {
    padding: 0;
  }
  .fc-theme-standard .fc-scrollgrid {
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  .fc-theme-standard tr:last-child td {
    border-bottom: none;
  }
  .fc-theme-standard thead th:last-child,
  .fc-theme-standard tbody td:last-child {
    border-right: none;
  }
  .fc-theme-standard thead th:first-child,
  .fc-theme-standard tbody td:first-child {
    border-left: none;
  }
  .fc {
    .fc-toolbar-title {
      font-size: 1.125rem;
      font-weight: 500;
    }
    .fc-col-header-cell-cushion {
      padding: 4px;
      font-weight: 500;
      font-size: 0.9rem;
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
      .fc-icon {
        font-size: 100%;
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
      background-color: #f1f0f2;
    }
    .fc-today-button {
      color: var(--primary);
      background-color: var(--primaryLabel);
      padding: 0.3rem 0.8rem;
      white-space: nowrap;
      text-transform: uppercase;
      font-size: 0.8rem;
      margin: 0 0.75rem;
      &:disabled {
        color: var(--secondary);
        background-color: var(--secondaryLabel);
        opacity: 0.7;
      }
    }
    .fc-toolbar {
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      align-items: center;
      padding: 1.5rem;
      padding-bottom: 0;
      .fc-toolbar-chunk {
        &:first-child {
          display: flex;
          align-items: center;
        }
      }
    }
    .fc-button-group > .fc-button {
      flex: none;
    }
    .fc-addEventButton-button {
      display: flex;
      align-items: center;
      background-color: #7367f0;
      color: #fff;
      font-size: 0.9375rem;
      white-space: nowrap;
      padding: 0.3rem 1.25rem;
      border-radius: 0.375rem;
      &::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='white' class='bi bi-plus' viewBox='0 0 16 16'%3E%3Cpath d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'/%3E%3C/svg%3E");
        transform: translateY(2px);
      }
      &:not(:disabled):active {
        background-color: #7367f0;
        color: #fff;
      }
    }
  }
  .fc-prev-button,
  .fc-next-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
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
  const [inputData, setinput] = useState("second");

  const onChange = (e) => {
    setinput(e.target.value);
  };
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
          text: "프로젝트 추가",

          click: function (e) {
            const btn = e.target;
            if (!btn.hasAttribute("popovertarget")) {
              btn.setAttribute("popovertarget", "aa");
            }
            // var dateStr = prompt("YYYY-MM-DD 형식으로 입력하세요.");
            // var date = new Date(inputData + "T00:00:00");
            // if (!isNaN(date.valueOf())) {
            //   calendar.addEvent({
            //     title: "일정 삽입",
            //     start: date,
            //     allDay: true,
            //   });
            //   alert("Update DB...");
            // }
          },
        },
      },
    });
    calendar.render();
    return () => {
      calendar.destroy();
    };
  }, [inputData]);
  return (
    <>
      <CalendarWrap>
        <div ref={calendarRef} className="calendar"></div>
      </CalendarWrap>
      <WorkWrite className="aa" id={"aa"} />
    </>
  );
};

export default Work;
