import React, { useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Grid,
    GridColumnSpan,
    PagingItem,
    Table,
    TablePaging,
} from '../GlobalStyles';
import Dialog from '../Dialog';
import Input from '../Input';
import Radio, { RadioGroup } from '../Radio';
import { Link } from 'react-router-dom';
import AttendanceListItem from './AttendanceListItem';

const AttendanceList = ({ ...props }) => {
    const [attendances, setAttendances] = useState([]); // json
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: 'user1' }); // 로그인한 사용자 정보

    useEffect(() => {
        fetch('http://localhost:3000/attendance')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAttendances(data || []);
            })
            .catch((err) => {
                console.error(err);
            });

        setIsAdmin(false); //임시로 관리자는 안보이게

        setCurrentUser({ id: 'user1' }); // 현재사용자정보
    }, []);
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
                        if (item.authorId === currentUser?.id || isAdmin) {
                            return (
                                <tr key={item.id}>
                                    <AttendanceListItem item={item} />
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
