import { Badge } from '../GlobalStyles';

import { useParams, Link } from 'react-router-dom';

const AttendanceListItem = ({ item }) => {
    const { attendanceId } = useParams();

    //카테고리 색상
    const categoryColor = (category) => {
        switch (category) {
            case '휴가':
                return 'primary';
            case '조퇴':
                return 'warning';
            case '경조사':
                return 'danger';
            case '기타':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    //상태 색상
    const stateColor = (state) => {
        switch (state) {
            case '승인':
                return 'success';
            case '반려':
                return 'danger';
            case '대기':
                return 'primary';
            default:
                return 'primary';
        }
    };

    return (
        <>
            <td>
                <Link
                    to={`/attendance/read/${item.id}`}
                    state={{ attendanceId: attendanceId }}>
                    {item.title}
                </Link>
            </td>
            <td>
                {item.attendanceStart} ~ {item.attendanceEnd}
            </td>
            <td>
                <Badge $color={categoryColor(item.category)}>
                    {item.category}
                </Badge>
            </td>
            <td>
                <Badge $color={stateColor(item.state)}>{item.state}</Badge>
            </td>
        </>
    );
};

export default AttendanceListItem;
