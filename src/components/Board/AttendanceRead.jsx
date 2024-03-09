import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';

import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Input from '../Input';

import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';

const AttendanceRead = (props) => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const [attendances, setAttendances] = useState({}); // json
    const { attendanceId } = useParams();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const attendanceDoc = await getDoc(
                    doc(db, 'users', user.uid, 'attendance', attendanceId)
                ); // 해당 attendanceId에 대한 문서 가져오기
                if (attendanceDoc.exists()) {
                    // 문서가 존재할 경우 해당 데이터로 상태 업데이트
                    setAttendances(attendanceDoc.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching attendance:', error);
            }
        };
        fetchAttendance(); // fetchAttendance 함수 호출
    }, [attendanceId]); // attendanceId가 변경될 때마다 useEffect 실행

    return (
        <>
            <Card title={'근태신청'}>
                <Grid $col="3" className="mb3 attend-read">
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job0"
                            labelText="Name"
                            readOnly="readonly"
                            value={auth.currentUser.displayName}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job1"
                            labelText="Job Position"
                            readOnly="readonly"
                            value="과장"
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job2"
                            labelText="남은 휴가일수"
                            readOnly="readonly"
                            value="8 / 10"
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job3"
                            labelText="근태종류"
                            readOnly="readonly"
                            value="유급휴가"
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job4"
                            labelText="근태 시작일"
                            readOnly="readonly"
                            value={attendances.attendanceStart}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job5"
                            labelText="근태 종료일"
                            readOnly="readonly"
                            value="2024-03-25"
                        />
                    </div>
                    <GridColumnSpan $span="3">
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="title"
                                readOnly="readonly"
                                labelText="제목"
                                value={attendances.title}
                            />
                        </div>
                    </GridColumnSpan>
                    <GridColumnSpan $span="3">
                        <hr />

                        {attendances.attendanceContext}
                    </GridColumnSpan>
                </Grid>
                <hr />
                <div className="align both">
                    <Button $color="secondary" onClick={Back}>
                        이전
                    </Button>
                    <div>
                        <Button $color="primary" className="mr2">
                            승인
                        </Button>
                        <Button $color="danger">반려</Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default AttendanceRead;
