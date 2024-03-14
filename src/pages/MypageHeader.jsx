import styled from 'styled-components';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { Badge, Button } from '../components/GlobalStyles';
import { Calendar2, PersonBadge, PersonWorkspace } from 'react-bootstrap-icons';
import bg from '../assets/bg_profile.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = styled.div`
    grid-column: 1/-1;
    > div > div {
        padding: 0;
        overflow: hidden;
    }

    .personal-bg {
        overflow: hidden;
        img {
            width: 100%;
            object-fit: cover;
        }
    }
    .personal-info {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        grid-template-rows: 1fr min-content;
        gap: 1rem;
        padding: 1.5rem;
        margin-top: -4rem;
        p {
            font-size: 1.375rem;
            color: var(--dark);
            align-self: end;
        }
        ul {
            display: flex;
            gap: 2rem;
            li {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            svg {
                font-size: 1.2rem;
            }
        }
        ${Button} {
            grid-column: 3/4;
            grid-row: 1/3;
            white-space: nowrap;
            align-self: end;
        }
    }
`;

function MypageHeader({ ...props }) {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate('/mypage/edit');
    };
    const dispatch = useDispatch();

    return (
        <>
            <Header {...props}>
                <Card>
                    <div className="personal-bg">
                        <img src={bg} alt="" />
                    </div>
                    <div className="personal-info">
                        <Avatar />
                        <p>My Name Taki</p>
                        <ul>
                            <li>
                                <PersonBadge /> 소속팀 : 개발팀
                            </li>
                            <li>
                                <Calendar2 /> 입사일 : 2024년 3월
                            </li>
                            <li>
                                <PersonWorkspace /> 상태 :
                                <Badge $color="primary">근무전</Badge>
                            </li>
                        </ul>
                        <Button $color="primary" onClick={handleEdit}>
                            회원정보수정
                        </Button>
                    </div>
                </Card>
            </Header>
        </>
    );
}

export default MypageHeader;
