import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Input from '../Input';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceById } from '../../store/attendanceDetail.slice';

const AttendanceRead = (props) => {
    const [attendances, setAttendances] = useState({}); // json
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const { attendanceId } = useParams();
    const { userInfo } = useSelector((state) => state.userSlice);

    const dispatch = useDispatch();
    const { attendanceDetail } = useSelector(
        (state) => state.attendanceDetailSlice
    );

    useEffect(() => {
        dispatch(fetchAttendanceById({ attendanceId, user: userInfo }));
    }, [attendanceId, userInfo, dispatch]);

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
                            value={userInfo.name}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job1"
                            labelText="Job Position"
                            readOnly="readonly"
                            value={userInfo.position}
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
                            value={attendanceDetail.category}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job4"
                            labelText="근태 시작일"
                            readOnly="readonly"
                            value={attendanceDetail.attendanceStart}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job5"
                            labelText="근태 종료일"
                            readOnly="readonly"
                            value={attendanceDetail.attendanceEnd}
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
                                value={attendanceDetail.title}
                            />
                        </div>
                    </GridColumnSpan>
                    <GridColumnSpan $span="3">
                        <hr />

                        {attendanceDetail.attendanceContext}
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
