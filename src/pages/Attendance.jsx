import React, { useState } from 'react';
import Card from '../components/Card';
import BoardList from '../components/Board/BoardList';
import { Button } from '../components/GlobalStyles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { auth } from '../firebase';

const Attendance = () => {
    const navigate = useNavigate();
    const gotoWrite = () => {
        navigate('/attendance/write');
    };

    const { isAdmin } = useSelector((state) => state.userSlice);

    return (
        <div>
            <Card title={'Member Salary List'}>
                <div className="align right mb3">
                    {!isAdmin && (
                        <Button $color="primary" onClick={gotoWrite}>
                            근태신청
                        </Button>
                    )}
                </div>
                <BoardList state={'attendance'} />
            </Card>
        </div>
    );
};

export default Attendance;
