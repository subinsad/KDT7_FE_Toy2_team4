import AttendanceList from "./AttendanceList";
import ProjectList from "./ProjectList";
import SalaryList from "./SalaryList";

const BoardList = ({ state, setShowDialog, ...props }) => {
  return (
    <>
      {state === "project" && <ProjectList />}
      {state === "attendance" && <AttendanceList />}
      {state === "salary" && <SalaryList setShowDialog={setShowDialog} />}
    </>
  );
};

export default BoardList;
