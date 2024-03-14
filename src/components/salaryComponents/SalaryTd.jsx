import React from 'react';
import { Badge, Button, Grid, GridColumnSpan, Table } from '../GlobalStyles';
import Avatar from '../Avatar';
import styled from 'styled-components';
import Dialog from '../Dialog';
import Input from '../Input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../store/salaryAdmin.slice';

const Name = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.8rem;
`;

const SalaryTd = ({
    name,
    userImg,
    position,
    salary,
    type,
    uid,
    tdId,
    setShowDialog,
}) => {
    const { userInfo } = useSelector((state) => state.userSlice);
    const [userSalary, setUserSalary] = useState(salary);
    const dispatch = useDispatch();
    const onSubmit = async () => {
        try {
            //유저의 급여 db 먼저 수정하기
            const userSalaryDocRef = doc(db, 'users', uid, 'salary', 'data');
            await setDoc(
                userSalaryDocRef,
                {
                    [type]: userSalary,
                },
                { merge: true }
            );
            //admin 계정 급여 db도 맞게 수정하기
            const adminDocRef = doc(
                db,
                'users',
                userInfo.uid,
                'salary',
                'data'
            );
            const adminDoc = await getDoc(adminDocRef);
            const userData = adminDoc.data();
            const selectItem = userData.allSalaryInfo.find(
                (item) => item.uid === uid && item.type === type
            );
            const updatedSelectItem = { ...selectItem, salary: userSalary };
            const updatedAllSalaryInfo = userData.allSalaryInfo.map((item) =>
                item.uid === uid && item.type === type
                    ? updatedSelectItem
                    : item
            );
            await setDoc(adminDocRef, {
                ...userData,
                allSalaryInfo: updatedAllSalaryInfo,
            });
            dispatch(fetchUserInfo(userInfo));
            setUserSalary('');
            setShowDialog(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <tr>
                <td>
                    <Name>
                        <Avatar src={userImg} size={'xs'} />
                        {name}
                    </Name>
                </td>
                <td>{position}</td>
                <td>12</td>
                <td>{Number(salary).toLocaleString()}원</td>
                <td>
                    <Badge $color="danger">퇴근</Badge>
                </td>
                {type === 'baseSalary' && (
                    <td>
                        <Badge $color="primary">기본급</Badge>
                    </td>
                )}
                {type === 'bonusSalary' && (
                    <td>
                        <Badge $color="danger">성과급</Badge>
                    </td>
                )}
                {type === 'specialSalary' && (
                    <td>
                        <Badge $color="warning">특수보너스</Badge>
                    </td>
                )}

                <td>
                    <Button $color="primary" $size="xs" popovertarget={tdId}>
                        수정
                    </Button>
                </td>
            </tr>

            <Dialog id={tdId}>
                <Grid $col="2" className="text-left">
                    <GridColumnSpan $span="2">
                        <Table>
                            <thead style={{ border: 'none' }}>
                                <tr style={{ border: 'none' }}>
                                    <th style={{ border: 'none' }}>Name</th>
                                    <th style={{ border: 'none' }}>
                                        Jop Position
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ border: 'none' }}>
                                <tr style={{ border: 'none' }}>
                                    <td style={{ border: 'none' }}>{name}</td>
                                    <td style={{ border: 'none' }}>
                                        {position}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </GridColumnSpan>

                    <GridColumnSpan $span="2">
                        <Table>
                            <thead style={{ border: 'none' }}>
                                <tr style={{ border: 'none' }}>
                                    <th style={{ border: 'none' }}>
                                        Salary Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ border: 'none' }}>
                                <tr style={{ border: 'none' }}>
                                    {type === 'baseSalary' && (
                                        <td style={{ border: 'none' }}>
                                            <Button
                                                $color="primary"
                                                $size="sm"
                                                className="mr2"
                                                $outline
                                                style={{ cursor: 'default' }}>
                                                기본급
                                            </Button>
                                        </td>
                                    )}
                                    {type === 'bonusSalary' && (
                                        <td style={{ border: 'none' }}>
                                            <Button
                                                $color="danger"
                                                $size="sm"
                                                className="mr2"
                                                $outline
                                                style={{ cursor: 'default' }}>
                                                성과급
                                            </Button>
                                        </td>
                                    )}
                                    {type === 'specialSalary' && (
                                        <td style={{ border: 'none' }}>
                                            <Button
                                                $color="warning"
                                                $size="sm"
                                                className="mr2"
                                                $outline
                                                style={{ cursor: 'default' }}>
                                                특수보너스
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </Table>
                    </GridColumnSpan>

                    <GridColumnSpan $span="2">
                        <Table>
                            <tr style={{ border: 'none' }}>
                                <td style={{ border: 'none' }}>
                                    <Input
                                        type="number"
                                        label="cost"
                                        labelText="Salary"
                                        value={userSalary}
                                        onChange={(e) =>
                                            setUserSalary(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                        </Table>
                    </GridColumnSpan>
                </Grid>
                <div>
                    <Button
                        $color="success"
                        $size="sm"
                        popovertarget={tdId}
                        popovertargetaction="hide"
                        className="mr2"
                        onClick={onSubmit}>
                        수정
                    </Button>
                    <Button
                        $color="secondary"
                        $size="sm"
                        popovertarget={tdId}
                        popovertargetaction="hide">
                        취소
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default SalaryTd;
