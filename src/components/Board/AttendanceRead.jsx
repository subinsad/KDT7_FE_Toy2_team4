import React from 'react';

import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Input from '../Input';

import { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';

const AttendanceRead = (props) => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const [attendances, setAttendances] = useState([]); // json
    const { attendanceId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/attendance/${attendanceId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAttendances(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [attendanceId]);

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
                            value={attendances.title}
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
                            value="2024-03-21"
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
                        근태 내용삽입
                        {attendances.title}
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
