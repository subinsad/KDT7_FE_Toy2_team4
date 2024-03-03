import styled from "styled-components";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import BoardList from "../components/Board/BoardList";
import { Badge, Button } from "../components/GlobalStyles";

const MypageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  .person-info {
    text-align: center;
    padding-top: 1.5rem;
    &__name {
      padding: 0.5rem 0;
      font-size: 1.3rem;
      font-weight: 400;
    }
    &__title {
      display: block;
      text-align: left;
      color: #a5a3ae;
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0 0 1rem;
    }
  }
`;
const PersonalInfoList = styled.ul`
  display: grid;
  gap: 1rem;
  text-align: left;
  font-size: 0.9rem;
  padding: 0 0 1rem;
  li {
    display: grid;
    grid-template-columns: min-content min-content 1fr;
    gap: 0.2rem;
    align-items: center;
  }
  b {
    font-weight: 600;
    color: #5d596c;
    white-space: nowrap;
  }
  &.salary {
    text-align: right;
    li {
      grid-template-columns: 2fr min-content 1fr;
    }
  }
`;
const ThisMonthSalary = styled.div`
  color: var(--primary);
  font-weight: 900;
  font-size: 1.8rem;
  text-align: right;
  padding: 0 0 1.5rem;
  span {
    color: var(--secondary);
    font-weight: 400;
    font-size: 1rem;
    padding: 0 0 0 0.2rem;
  }
`;
function Mypage() {
  return (
    <>
      <MypageWrap>
        <Card className="person-info">
          <Avatar size={"xl"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/15.png"} />
          <p className="person-info__name">Name isHere</p>
          <Badge $color="secondary">과장</Badge>
          <hr />
          <strong className="person-info__title">Details</strong>
          <PersonalInfoList>
            <li>
              <b>Name</b> : <strong> 아무개</strong>
            </li>
            <li>
              <b>직급</b> : <strong> 과장</strong>
            </li>
            <li>
              <b>Email</b> : <strong> 123@123.com</strong>
            </li>
            <li>
              <b>Status</b> :
              <strong>
                <Badge $color="success" $size="xs">
                  출근중
                </Badge>
              </strong>
            </li>
            <li>
              <b>Phone</b> : <strong> 000-0000-0000</strong>
            </li>
            <li>
              <b>소속팀</b> :<strong> 개발팀</strong>
            </li>
          </PersonalInfoList>
          <Button $color="primary" $size="sm">
            회원정보수정
          </Button>
        </Card>
        <Card title={"My Project State"}>
          <BoardList state={"project"} />
        </Card>
        <Card title={"이달의 급여"}>
          <ThisMonthSalary>
            ₩4,000,000<span>원</span>
          </ThisMonthSalary>
          <PersonalInfoList className="salary">
            <li>
              <b>실급여</b> : <strong>1,000,000원</strong>
            </li>
            <li>
              <b>급여삭감</b> : <strong>- 200,000원</strong>
            </li>
            <li>
              <b>예상급여</b> : <strong>1,000,000원</strong>
            </li>
            <li>
              <b>4대보험</b> : <strong>1,000,000원</strong>
            </li>
            <li>
              <b>성과급</b> :<strong>1,000,000원</strong>
            </li>
          </PersonalInfoList>
        </Card>
        <Card title={"My Attendance State"}>
          <BoardList state="attendance" />
        </Card>
      </MypageWrap>
    </>
  );
}

export default Mypage;
