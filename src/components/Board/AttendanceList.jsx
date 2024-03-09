import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';

import { Button, PagingItem, Table, TablePaging } from '../GlobalStyles';
import Dialog from '../Dialog';
import Radio, { RadioGroup } from '../Radio';
import AttendanceListItem from './AttendanceListItem';

const AttendanceList = ({ ...props }) => {
    const [attendances, setAttendances] = useState([]); // json
    const [user, setUser] = useState(null); // 사용자 상태
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // 사용자의 인증 상태를 감시하고 변경되면 setUser를 호출하여 사용자를 업데이트
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // cleanup 함수에서 구독을 해제
    }, []);

    useEffect(() => {
        const fetchAttend = async () => {
            // 사용자가 로그인되어 있을 경우에만 실행
            if (user) {
                const attendQuery = query(
                    collection(db, 'users', user.uid, 'attendance'),
                    orderBy('createdAt', 'desc'),
                    limit(10)
                );

                const unsubscribe = await onSnapshot(
                    attendQuery,
                    (snapshot) => {
                        const attends = snapshot.docs.map((doc) => {
                            const {
                                content,
                                createdAt,
                                attendanceStart,
                                attendanceEnd,
                                category,
                                title,
                                attendanceContext,
                                userId,
                                username,
                            } = doc.data();
                            return {
                                content,
                                createdAt,
                                attendanceStart,
                                attendanceEnd,
                                attendanceContext,
                                category,
                                title,
                                userId,
                                username,
                                id: doc.id,
                            };
                        });
                        setAttendances(attends);
                    }
                );
                return () => unsubscribe();
            }
        };
        fetchAttend();
    }, [user]); // user 상태가 변경될 때마다 실행

    return (
        <>
            <Table {...props}>
                <colgroup>
                    <col />
                    <col style={{ width: '220px' }} />
                    <col style={{ width: '150px' }} />
                    <col style={{ width: '150px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Status</th>
                        {isAdmin && <th>Setting</th>}
                    </tr>
                </thead>
                <tbody>
                    {/* 아이템 map으로 배열 */}
                    {attendances.map((item) => {
                        if (item.userId === user?.uid || isAdmin) {
                            return (
                                <tr key={item.id}>
                                    <AttendanceListItem
                                        item={item}
                                        attendanceId={item.id}
                                    />
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </Table>
            <TablePaging>
                <PagingItem>Previous</PagingItem>
                <PagingItem $active>1</PagingItem>
                <PagingItem>2</PagingItem>
                <PagingItem>3</PagingItem>
                <PagingItem>4</PagingItem>
                <PagingItem>5</PagingItem>
                <PagingItem>Next</PagingItem>
            </TablePaging>

            <Dialog id={'settings'}>
                <div className="text-left">
                    <RadioGroup title="Category">
                        <Radio
                            value="승인"
                            checked={true}
                            id="settingRadio1"
                            name="settingRadio"
                            color="success"
                        />
                        <Radio
                            value="대기"
                            id="settingRadio2"
                            name="settingRadio"
                            color="primary"
                        />
                        <Radio
                            value="반려"
                            id="settingRadio3"
                            name="settingRadio"
                            color="danger"
                        />
                    </RadioGroup>
                </div>
                <div>
                    <Button
                        $color="success"
                        $size="sm"
                        popovertarget="settings"
                        popovertargetaction="hide"
                        className="mr2">
                        설정
                    </Button>
                    <Button
                        $color="secondary"
                        $size="sm"
                        popovertarget="settings"
                        popovertargetaction="hide">
                        닫기
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default AttendanceList;
