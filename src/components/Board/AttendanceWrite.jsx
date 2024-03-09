import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Select from '../Select';
import Input from '../Input';
import Radio, { RadioGroup } from '../Radio';
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';
import { attendaceCategory } from '../../data/selectOption';

import useInput from '../../Hooks/useInput';

import { auth, db } from '../../firebase';
import { addDoc, collection, getDoc, doc } from '@firebase/firestore';

const AttendanceWrite = () => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    //const title = useInput(''); // input창 입력값 가져오기
    //const attendanceContext = useInput('');

    const [title, setTitle] = useState('');
    const [attendanceContext, setAttendanceContext] = useState('');
    const [category, setCategory] = useState('');
    const [attendanceStart, setAttendanceStart] = useState('');
    const [attendanceEnd, setAttendanceEnd] = useState('');

    const handleChange = (e) => {
        // 변경된 부분
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'attendanceContext') {
            setAttendanceContext(value);
        }
        console.log(value); // 선택된 값을 확인하기 위한 로그
    };

    //라디오체크박스
    const handleRadio = (value) => {
        setCategory(value);
        console.log('radio', value);
    };

    // 날짜입력
    const handleDate = (name, selectedDate) => {
        if (name === 'attendanceStart') {
            setAttendanceStart(selectedDate);
        } else if (name === 'attendanceEnd') {
            setAttendanceEnd(selectedDate);
        }
        console.log(selectedDate); // 선택된 날짜 확인
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (
            !user ||
            title === '' ||
            attendanceContext === '' ||
            category === '' ||
            attendanceStart === '' ||
            attendanceEnd === ''
        )
            return; //빈값전송방지
        console.log(user);

        try {
            await addDoc(collection(db, 'users', user.uid, 'attendance'), {
                title,
                attendanceContext,
                category,
                attendanceStart,
                attendanceEnd,
                createdAt: Date.now(),
                username: user.displayName,
                userId: user.uid,
            });
        } catch (error) {
            console.log('onSubmit Error : ', error);
        } finally {
            navigate('/Attendance');
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
                                value={'user.name'}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job"
                                labelText="Job Position"
                                readOnly="readonly"
                                value={'user'}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job"
                                labelText="남은 휴가일수"
                                readOnly="readonly"
                                value="8 / 10"
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
                                value={attendanceStart}
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
                                value={attendanceEnd}
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
                                {/* 이부분은됨 */}
                                <input onChange={handleChange} name="title" />
                                <input
                                    onChange={handleChange}
                                    name="attendanceContext"
                                />
                            </div>
                        </GridColumnSpan>
                        <GridColumnSpan $span="3">
                            <Editor
                                title="근태내용"
                                label="attendanceContext"
                                onChange={handleChange}></Editor>
                        </GridColumnSpan>
                    </Grid>

                    <hr />
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
