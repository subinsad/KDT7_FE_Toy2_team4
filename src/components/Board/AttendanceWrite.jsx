import React, { useState } from 'react';
import Card from '../Card';
import { Button, Grid, GridColumnSpan } from '../GlobalStyles';
import Select from '../Select';
import Input from '../Input';
import Radio, { RadioGroup } from '../Radio';
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';
import { attendaceCategory } from '../../data/selectOption';

import useInput from '../../Hooks/useInput';

const optionMember = [
    {
        value: 'member1',
        text: '팀원1',
        userPosition: '과장',
    },
    {
        value: 'member2',
        text: '팀원2',
        userPosition: '사원',
    },
    {
        value: 'member3',
        text: '팀원3',
        userPosition: '인턴',
    },
];

const AttendanceWrite = () => {
    const navigate = useNavigate();
    const Back = () => {
        navigate('/attendance');
    };

    const title = useInput(''); // input창 입력값 가져오기

    const handleChange = (e) => {};

    const handleSubmit = (e) => {
        // e.preventDefault();
        // const user = auth.currentUser;
        // const userDocRef = doc(db, 'users', user.uid);
    };

    return (
        <>
            <Card title={'근태신청'}>
                <Grid $col="3" className="mb3">
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="Name"
                            labelText="Name"
                            readOnly="readonly"
                            value={optionMember[0].text}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            plainText
                            label="job"
                            labelText="Job Position"
                            readOnly="readonly"
                            value={optionMember[0].userPosition}
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
