import React, { useState } from 'react';
import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';

import Input from '../Input';
import Radio, { RadioGroup } from '../Radio';
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';
import { attendaceCategory } from '../../data/selectOption';

import { auth, db } from '../../firebase';
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    arrayUnion,
} from '@firebase/firestore';

import { useSelector, useDispatch } from 'react-redux';

import { addAttendance } from '../../store/attendance.slice';

const AttendanceWrite = () => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const { userInfo } = useSelector((state) => state.userSlice);

    const dispatch = useDispatch();

    const [attendanceData, setAttendanceData] = useState({
        title: '',
        attendanceContext: '',
        category: '',
        attendanceStart: '',
        attendanceEnd: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setAttendanceData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const textChange = (value) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            attendanceContext: value,
        }));
    };

    //라디오체크박스
    const handleRadio = (value) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    // 날짜입력
    const handleDate = (name, selectedDate) => {
        if (name === 'attendanceStart') {
            setAttendanceData((prevData) => ({
                ...prevData,
                [name]: selectedDate,
            }));
        } else if (name === 'attendanceEnd') {
            setAttendanceData((prevData) => ({
                ...prevData,
                [name]: selectedDate,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || attendanceData.title === '') return;

        try {
            // 파이어베이스에서 생성된 id로 attendanceId 설정
            const newDocRef = await addDoc(
                collection(db, 'users', user.uid, 'attendance'),
                {
                    title: attendanceData.title,
                    attendanceContext: attendanceData.attendanceContext,
                    category: attendanceData.category,
                    attendanceStart: attendanceData.attendanceStart,
                    attendanceEnd: attendanceData.attendanceEnd,
                    createdAt: new Date().toLocaleString(),
                    name: userInfo.name,
                    position: userInfo.position,
                    userId: userInfo.uid,
                    state: '대기',
                }
            );

            // attendanceId 설정
            const attendanceId = newDocRef.id;

            dispatch(
                addAttendance({
                    title: attendanceData.title,
                    attendanceContext: attendanceData.attendanceContext,
                    category: attendanceData.category,
                    attendanceStart: attendanceData.attendanceStart,
                    attendanceEnd: attendanceData.attendanceEnd,
                    createdAt: new Date().toLocaleString(),
                    name: userInfo.name,
                    position: userInfo.position,
                    userId: userInfo.uid,
                    state: '대기',
                    id: attendanceId,
                })
            );

            // 여기서부터 추가
            const attendaceDocRef = doc(
                db,
                'users',
                '0vY0bqw8nKT7lGbiSotVrcVzZWs1',
                'attendance',
                'data'
            );
            try {
                await updateDoc(attendaceDocRef, {
                    allAttendanceInfo: arrayUnion({
                        title: attendanceData.title,
                        attendanceContext: attendanceData.attendanceContext,
                        category: attendanceData.category,
                        attendanceStart: attendanceData.attendanceStart,
                        attendanceEnd: attendanceData.attendanceEnd,
                        createdAt: new Date().toLocaleString(),
                        name: userInfo.name,
                        position: userInfo.position,
                        userId: userInfo.uid,
                        state: '대기',
                        id: attendanceId,
                    }),
                });
            } catch (error) {
                console.log('안들어감');
            }

            navigate('/Attendance');
        } catch (error) {
            console.log('onSubmit Error : ', error);
        }
    };
    return (
        <>
            <Card title={'근태신청'}>
                <form onSubmit={handleSubmit}>
                    <Grid $col="3" className="mb3">
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="Name"
                                labelText="Name"
                                readOnly="readonly"
                                value={userInfo.name}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job"
                                labelText="Job Position"
                                readOnly="readonly"
                                value={userInfo.position}
                            />
                        </div>

                        <RadioGroup title="근태종류">
                            {attendaceCategory.map((item) => {
                                return (
                                    <Radio
                                        key={item.id}
                                        value={item.value}
                                        id={item.id}
                                        name={item.name}
                                        color={item.color}
                                        label="category"
                                        onChange={() => handleRadio(item.value)}
                                    />
                                );
                            })}
                        </RadioGroup>
                        <div>
                            <Input
                                type="date"
                                label="startdate"
                                labelText="근태 시작일"
                                name="attendanceStart"
                                value={attendanceData.attendanceStart}
                                onChange={(e) =>
                                    handleDate(
                                        'attendanceStart',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Input
                                type="date"
                                label="enddate"
                                labelText="근태 종료일"
                                name="attendanceEnd"
                                value={attendanceData.attendanceEnd}
                                onChange={(e) =>
                                    handleDate('attendanceEnd', e.target.value)
                                }
                            />
                        </div>
                        <GridColumnSpan $span="3">
                            <div>
                                <Input
                                    type="text"
                                    label="title"
                                    labelText="제목"
                                    onChange={handleChange}
                                    name="title"
                                />
                            </div>
                        </GridColumnSpan>
                        <GridColumnSpan $span="3">
                            <Editor
                                title="근태내용"
                                label="attendanceContext"
                                onChange={textChange}></Editor>
                        </GridColumnSpan>
                    </Grid>

                    <div className="align both">
                        <Button $color="secondary" onClick={Back}>
                            리스트
                        </Button>
                        <Button type="submit" $color="primary">
                            근태신청
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
};

export default AttendanceWrite;
