import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Input from '../Input';

import { useDispatch, useSelector } from 'react-redux';

const AttendanceRead = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Back = () => {
        navigate('/attendance');
    };

    const { attendanceId } = useParams();
    const { userInfo } = useSelector((state) => state.userSlice);
    const { isAdmin } = useSelector((state) => state.userSlice);

    //유저아이템
    const { attendance } = useSelector((state) => state.attendanceSlice);
    const selectedUserItem = attendance.find((item) => {
        return item.id === attendanceId;
    });

    // 관리자아이템
    const { allAttendance } = useSelector(
        (state) => state.attendanceAdminSlice
    );
    const selectedItem = allAttendance.find((item) => {
        return item.id === attendanceId;
    });

    return (
        <>
            {!isAdmin && (
                <Card title={'근태신청'}>
                    <Grid $col="3" className="mb3 attend-read">
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job0"
                                labelText="Name"
                                readOnly="readonly"
                                value={selectedUserItem.name}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job1"
                                labelText="Job Position"
                                readOnly="readonly"
                                value={selectedUserItem.position}
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job3"
                                labelText="근태종류"
                                readOnly="readonly"
                                value={selectedUserItem.category}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job4"
                                labelText="근태 시작일"
                                readOnly="readonly"
                                value={selectedUserItem.attendanceStart}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job5"
                                labelText="근태 종료일"
                                readOnly="readonly"
                                value={selectedUserItem.attendanceEnd}
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
                                    value={selectedUserItem.title}
                                />
                            </div>
                        </GridColumnSpan>
                        <GridColumnSpan $span="3">
                            <hr />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: selectedUserItem.attendanceContext,
                                }}
                            />
                        </GridColumnSpan>
                    </Grid>
                    <hr />
                    <div className="align both">
                        <Button $color="secondary" onClick={Back}>
                            이전
                        </Button>
                        {isAdmin && (
                            <div>
                                <Button $color="primary" className="mr2">
                                    승인
                                </Button>
                                <Button $color="danger">반려</Button>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {isAdmin && (
                <Card title={'근태신청'}>
                    <Grid $col="3" className="mb3 attend-read">
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job0"
                                labelText="Name"
                                readOnly="readonly"
                                value={selectedItem.name}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job1"
                                labelText="Job Position"
                                readOnly="readonly"
                                value={selectedItem.position}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job3"
                                labelText="근태종류"
                                readOnly="readonly"
                                value={selectedItem.category}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job4"
                                labelText="근태 시작일"
                                readOnly="readonly"
                                value={selectedItem.attendanceStart}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job5"
                                labelText="근태 종료일"
                                readOnly="readonly"
                                value={selectedItem.attendanceEnd}
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
                                    value={selectedItem.title}
                                />
                            </div>
                        </GridColumnSpan>
                        <GridColumnSpan $span="3">
                            <hr />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: selectedItem.attendanceContext,
                                }}
                            />
                        </GridColumnSpan>
                    </Grid>
                    <hr />
                    <div className="align both">
                        <Button $color="secondary" onClick={Back}>
                            이전
                        </Button>
                        {isAdmin && (
                            <div>
                                <Button $color="primary" className="mr2">
                                    승인
                                </Button>
                                <Button $color="danger">반려</Button>
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </>
    );
};

export default AttendanceRead;
