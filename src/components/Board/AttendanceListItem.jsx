import React, { useEffect, useState } from 'react';
import { Badge, Button } from '../GlobalStyles';

import { Link } from 'react-router-dom';

const AttendanceListItem = ({ item }) => {
    const [attendances, setAttendances] = useState([]); // json
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: 'user1' }); // 로그인한 사용자 정보

    //카테고리 색상
    const categoryColor = (category) => {
        if (category === '휴가') {
            return 'primary';
        } else if (category === '조퇴') {
            return 'warning';
        } else if (category === '경조사') {
            return 'danger';
        } else if (category === '기타') {
            return 'secondary';
        }
    };

    //상태 색상
    const stateColor = (state) => {
        if (state === '승인') {
            return 'success';
        } else if (state === '반려') {
            return 'danger';
        } else if (state === '대기') {
            return 'primary';
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/attendance')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAttendances(data || []);
            })
            .catch((err) => {
                console.error(err);
            });

        setIsAdmin(false); //임시로 관리자는 안보이게

        setCurrentUser({ id: 'user1' }); // 현재사용자정보
    }, []);

    return (
        <>
            <td>
                <Link to="/attendance/read">{item.title}</Link>
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
            <td>
                {isAdmin && (
                    <Button
                        $color="primary"
                        $size="xs"
                        popovertarget="settings">
                        설정
                    </Button>
                )}
            </td>
        </>
    );
};

export default AttendanceListItem;
