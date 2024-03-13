import {
    ArrowDownLeftSquare,
    Bell,
    BoxArrowInLeft,
    BoxArrowInRight,
    BoxArrowRight,
    LightbulbOff,
    Outlet,
    PersonBadge,
    PersonCheck,
    SignNoLeftTurn,
    Unlock,
    X,
} from 'react-bootstrap-icons';
import { Link, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase';
import { clearUser } from '../store/user.slice';
import { clearSalaryInfo } from '../store/salaryAdmin.slice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Dialog from './Dialog';
import { Badge, Button } from './GlobalStyles';
import Card from './Card';

import { workStart, workEnd } from '../store/work.slice';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const NavBarWrap = styled.div`
    position: fixed;
    left: calc(50% + (16.25rem / 2));
    transform: translateX(-50%);
    top: 0;
    z-index: 100;
    width: 100%;
    max-width: 1440px;
    margin: 1rem 0 0;
    &::before {
        content: '';
        width: 100%;
        height: 4.875rem;
        position: fixed;
        top: -1rem;
        z-index: 10;
        backdrop-filter: saturate(200%) blur(10px);
        background: linear-gradient(
            180deg,
            rgba(248, 247, 250, 0.7) 44%,
            rgba(248, 247, 250, 0.43) 73%,
            rgba(248, 247, 250, 0)
        );
    }
    .navbar__wrap {
        display: flex;
        justify-content: end;
        position: relative;
        gap: 0.5rem;
        z-index: 20;
        height: 100%;
        padding: 0.5rem 1.5rem;
        background-color: rgba(255, 255, 255, 0.95);
    }
    @media (max-width: 1800px) {
        left: 17.25rem;
        transform: translateX(0);
        width: calc(100% - 18.25rem);
    }
`;
const Alrams = styled.button`
    position: relative;
    font-size: 1.3rem;
    padding: 0.543rem;
    background: transparent;
    span {
        position: absolute;
        display: flex;
        align-items: center;
        left: 50%;
        top: 0.2rem;
        background-color: var(--danger);
        color: var(--white);
        font-size: 0.7rem;
        line-height: 1;
        height: 1.2rem;
        padding: 0 0.4rem;
        border-radius: 0.8rem;
    }
`;
const AlramList = styled.div`
    position: fixed;
    left: calc(50% + 34rem);
    top: 4rem;
    overflow: visible;
    inset: none;
    box-shadow: 0 0.25rem 1rem rgba(165, 163, 174, 0.45);
    background-color: var(--white);
    ul {
        max-height: 14.08rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.4rem;

            background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
            width: 0.4rem;
            background-color: var(--darkLabel);
            border-radius: 0.4rem;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
    li {
        display: grid;
        grid-template-columns: 1fr min-content;
        gap: 0.4rem;
        align-items: center;
        svg {
            font-size: 0;
            width: 1rem;
            height: 1rem;
            justify-self: end;
            padding: 0;
        }
        border-top: 1px solid var(--border);
        padding: 1rem;
        &:hover {
            background: rgba(165, 163, 174, 0.1);
        }
        button {
            padding: 0;
            background-color: transparent;
        }
    }
    strong {
        display: block;
        padding: 1rem;
    }
`;

const AvatarList = styled.div`
    position: fixed;
    left: calc(50% + 37.5rem);
    top: 4.5rem;
    overflow: visible;
    inset: none;
    box-shadow: 0 0.25rem 1rem rgba(165, 163, 174, 0.45);
    background-color: var(--white);
    border-radius: 0.375rem;
    padding: 0.375rem 0;
    ul {
        min-width: 14rem;
    }
    a {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1rem;
        line-height: 1.375;
        padding: 0.42rem 1rem;
        width: calc(100% - 1rem);
        margin: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        &:hover {
            color: var(--primary);
            background-color: var(--primaryLabel);
        }
    }
`;

function NavBar() {
    const [workStartTime, setWorkStartTime] = useState('');
    const [workEndTime, setWorkEndTime] = useState('');

    const user = useSelector((state) => state.userSlice.userInfo);
    const { startTime, endTime } = useSelector(
        (state) => state.workSlice.working
    );

    const { userImg } = useSelector((state) => state.userSlice.userInfo);
    const dispatch = useDispatch();

    const navigate = useNavigation();
    const logout = async () => {
        try {
            await auth.signOut();
            dispatch(clearUser());
            dispatch(clearSalaryInfo());
            navigate('/login');
        } catch (error) {
            console.log('logout error : ', error);
        }
    };

    const workStart = async (user) => {
        const today = new Date();
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = `${today.getFullYear()}년 ${
            today.getMonth() + 1
        }월 ${today.getDate()}일`;

        setWorkStartTime(formattedTime);

        const userDocRef = doc(
            db,
            'workingtimeline',
            user.uid,
            user.name,
            formattedDate
        );

        await setDoc(
            userDocRef,
            {
                startTime: formattedTime,
            },
            { merge: true }
        );

        console.log(user.uid, user.name, formattedDate);
    };

    const workEnd = async (user) => {
        const today = new Date();
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = `${today.getFullYear()}년 ${
            today.getMonth() + 1
        }월 ${today.getDate()}일`;

        setWorkEndTime(formattedTime);

        const userDocRef = doc(
            db,
            'workingtimeline',
            user.uid,
            user.name,
            formattedDate
        );

        await setDoc(
            userDocRef,
            {
                endTime: formattedTime,
            },
            { merge: true }
        );

        console.log(formattedTime);
    };

    return (
        <>
            <NavBarWrap>
                <nav className="navbar__wrap">
                    <Alrams popovertarget="alram">
                        <Bell />
                        <span>5</span>
                    </Alrams>
                    <AlramList popover="auto" id="alram">
                        <strong>Notification</strong>
                        <ul>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                            <li>
                                근태가 승인되었습니다.
                                <button>
                                    <X />
                                </button>
                            </li>
                        </ul>
                    </AlramList>
                    {workStartTime === '' && workEndTime === '' && (
                        <Card>
                            <Button
                                $color="primary"
                                popovertarget="startDialog">
                                근무시작
                            </Button>
                            <Dialog id={'startDialog'}>
                                근무를 시작하시겠습니까?
                                <div>
                                    <Button
                                        $color="success"
                                        $size="sm"
                                        popovertarget="startDialog"
                                        popovertargetaction="hide"
                                        className="mr2"
                                        onClick={() => {
                                            workStart(user);
                                        }}>
                                        확인
                                    </Button>
                                    <Button
                                        $color="secondary"
                                        $size="sm"
                                        popovertarget="startDialog"
                                        popovertargetaction="hide">
                                        취소
                                    </Button>
                                </div>
                            </Dialog>
                        </Card>
                    )}
                    {workStartTime !== '' && workEndTime === '' && (
                        <Card>
                            <Button $color="primary" popovertarget="endDialog">
                                근무종료
                            </Button>
                            <Dialog id={'endDialog'}>
                                근무를 종료하시겠습니까?
                                <div>
                                    <Button
                                        $color="success"
                                        $size="sm"
                                        popovertarget="endDialog"
                                        popovertargetaction="hide"
                                        className="mr2"
                                        onClick={() => {
                                            workEnd(user);
                                        }}>
                                        확인
                                    </Button>
                                    <Button
                                        $color="secondary"
                                        $size="sm"
                                        popovertarget="endDialog"
                                        popovertargetaction="hide">
                                        취소
                                    </Button>
                                </div>
                            </Dialog>
                        </Card>
                    )}
                    {/* 근무시작은 하루에 1개, 근무종료하면 보여지는 ui */}
                    {workStartTime !== '' && workEndTime !== '' && (
                        <Badge $color="secondary">근무종료</Badge>
                    )}

                    <Avatar src={userImg} popovertarget="avatar" />
                    <AvatarList popover="auto" id="avatar">
                        <ul>
                            <li>
                                <Link to={'/mypage'}>
                                    <PersonCheck /> My Profile
                                </Link>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    <BoxArrowRight /> Log Out
                                </a>
                            </li>
                        </ul>
                    </AvatarList>
                </nav>
            </NavBarWrap>
        </>
    );
}
export default NavBar;
