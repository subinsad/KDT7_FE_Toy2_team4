import styled from "styled-components";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import { Badge, Button } from "../components/GlobalStyles";
import { Calendar2, PersonBadge, PersonWorkspace } from "react-bootstrap-icons";
import bg from "../assets/bg_profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { userImg, userBg, name, team, joinYear, joinMonth } = useSelector((state) => state.userSlice.userInfo)
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/mypage/edit");
  };
  return (
    <>
      <Header {...props}>
        <Card>
          <div className="personal-bg" style={{ maxWidth: '1500px', maxHeight: '228px' }}>
            <img src={userBg} alt="" />
          </div>
          <div className="personal-info">
            <Avatar src={userImg} style={{ maxWidth: '150px', maxHeight: '150px', cursor: 'default', borderRadius: '50%' }} />
            <p>{name}</p>
            <ul>
              <li>
                <PersonBadge /> 소속팀 : {team}
              </li>
              <li>
                <Calendar2 /> 입사일 : {joinYear}년 {joinMonth}월
              </li>
              {/* 근무 상태 변경 필요 */}
              <li>
                <PersonWorkspace /> 상태 :
                <Badge $color="success" $size="xs">
                  근무중
                </Badge>
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
