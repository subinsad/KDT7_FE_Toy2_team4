import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Input from '../Input';

import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance } from '../../store/attendance.slice';

const AttendanceRead = (props) => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const { attendanceId } = useParams();
    const user = auth.currentUser;

    const dispatch = useDispatch();
    const { attendance } = useSelector((state) => state.attendanceSlice);

    useEffect(() => {
        if (attendanceId) {
            // 컴포넌트가 마운트될 때 API로부터 근태 정보를 가져옵니다.
            dispatch(fetchAttendance(attendanceId));
        }
        console.log(attendanceId);
    }, [attendanceId, dispatch]);

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
                            value={attendance.category}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job4"
                            labelText="근태 시작일"
                            readOnly="readonly"
                            value={attendance.attendanceStart}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job5"
                            labelText="근태 종료일"
                            readOnly="readonly"
                            value={attendance.attendanceEnd}
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
                                value={attendance.title}
                            />
                        </div>
                    </GridColumnSpan>
                    <GridColumnSpan $span="3">
                        <hr />

                        {attendance.attendanceContext}
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
