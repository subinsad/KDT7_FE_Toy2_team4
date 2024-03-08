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

const AttendanceWrite = () => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const [users, setUsers] = useState([]); // json
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: 'user1' }); // 로그인한 사용자 정보

    const title = useInput(''); // input창 입력값 가져오기
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const attendanceContext = useInput('');

    const handleChange = (e) => {};

    const handleSubmit = (e) => {
        e.preventDefault();
        const attendanceData = {
            title: title.value,
            name,
            email,
            phone,
            attendanceContext: attendanceContext.value,
        };

        fetch('http://localhost:3000/attendance', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(attendanceData),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data); // 성공적으로 데이터가 전송되었을 때의 동작
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        setIsAdmin(false);
        setCurrentUser({ id: 'user1' });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/user')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUsers(data || []);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

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
                                value={
                                    users.length > 0 ? users[0].userName : ''
                                }
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                plainText
                                label="job"
                                labelText="Job Position"
                                readOnly="readonly"
                                value={
                                    users.length > 0
                                        ? users[0].userPosition
                                        : ''
                                }
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
                                    />
                                );
                            })}
                        </RadioGroup>
                        <div>
                            <Input
                                type="date"
                                label="startdate"
                                labelText="근태 시작일"
                            />
                        </div>
                        <div>
                            <Input
                                type="date"
                                label="enddate"
                                labelText="근태 종료일"
                            />
                        </div>
                        <GridColumnSpan $span="3">
                            <div>
                                <Input
                                    type="text"
                                    label="title"
                                    labelText="제목"
                                    value={title.value}
                                    onChange={title.onChange}
                                />
                            </div>
                        </GridColumnSpan>
                        <GridColumnSpan $span="3">
                            <Editor title="근태내용"></Editor>
                        </GridColumnSpan>
                    </Grid>
                </form>

                <hr />
                <div className="align both">
                    <Button $color="secondary" onClick={Back}>
                        리스트
                    </Button>
                    <Button $color="primary">근태신청</Button>
                </div>
            </Card>
        </>
    );
};

export default AttendanceWrite;
