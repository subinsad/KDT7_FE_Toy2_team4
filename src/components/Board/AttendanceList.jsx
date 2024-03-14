import { Table } from "../GlobalStyles";
import AttendanceListItem from "./AttendanceListItem";
import { useSelector } from "react-redux";

const AttendanceList = ({ ...props }) => {
  const { userInfo } = useSelector((state) => state.userSlice);
  const { attendance } = useSelector((state) => state.attendanceSlice);

  const { isAdmin } = useSelector((state) => state.userSlice);
  const { allAttendance } = useSelector((state) => state.attendanceAdminSlice);

  return (
    <>
      <Table {...props}>
        <colgroup>
          <col />
          <col style={{ width: "200px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* 관리자컴포넌트 */}
          {allAttendance &&
            allAttendance.map((item) => {
              if (isAdmin) {
                return (
                  <tr key={item.id}>
                    <AttendanceListItem item={item} allAttendance={item.id} />
                  </tr>
                );
              }
            })}

          {/* 사용자컴포넌트 */}
          {attendance &&
            attendance.length > 0 &&
            attendance.map((item) => {
              if (item.userId === userInfo.uid) {
                return (
                  <tr key={item.id}>
                    <AttendanceListItem item={item} attendanceId={item.id} attendance={attendance} />
                  </tr>
                );
              }
              return null;
            })}
        </tbody>
      </Table>
    </>
  );
};

export default AttendanceList;
