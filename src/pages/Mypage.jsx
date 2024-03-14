import styled from "styled-components";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import BoardList from "../components/Board/BoardList";
import { Badge, Button, Grid } from "../components/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { BarChart, Calendar2, CardList, Mailbox, MailboxFlag, People, Person, PersonBadge, PersonWorkspace, Telephone } from "react-bootstrap-icons";
import bg from "../assets/bg_profile.png";
import MypageHeader from "./MypageHeader";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const MypageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  .person-info {
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
  span {
    color: var(--secondary);
    font-weight: 400;
    font-size: 1rem;
    padding: 0 0 0 0.2rem;
  }
`;

const Left = styled.div`
  display: grid;
  gap: 1rem;
`;
const Right = styled.div`
  display: grid;
  gap: 1rem;
  align-self: start;
`;

function Mypage() {
<<<<<<< HEAD
  const { name, email, team, position, phone } = useSelector((state) => state.userSlice.userInfo)
  const { baseSalary, bonusSalary, SpecialSalary } = useSelector((state) => state.salarySlice.salary)
  const { isAdmin, isAdminLoading } = useSelector((state) => state.userSlice)
=======
  const { name, email, team, position, phone } = useSelector((state) => state.userSlice.userInfo);
  const { baseSalary, bonusSalary, SpecialSalary } = useSelector((state) => state.salarySlice.salary);

>>>>>>> feature/work
  const calTax = useMemo(() => {
    const totalSalary = Number(baseSalary) + Number(bonusSalary) + Number(SpecialSalary);
    const insurance = parseInt(totalSalary * 0.06);
    const tax = parseInt(totalSalary * 0.04);
    const sum = totalSalary - insurance - tax;
    return { insurance, tax, sum };
  }, [baseSalary, bonusSalary, SpecialSalary]);

  const { insurance, tax, sum } = calTax;

  return (
    <>
      <MypageWrap>
        <MypageHeader />
        <Left>
          <Card className="person-info" title={"Details"}>
            {/* <strong className="person-info__title">Details</strong> */}
            <PersonalInfoList>
              <li>
                <b>
                  <Person /> 이름
                </b>
                : <strong> {name}</strong>
              </li>
              <li>
                <b>
                  <BarChart /> 직급
                </b>
                : <strong> {position}</strong>
              </li>
              <li>
                <b>
                  <MailboxFlag /> 이메일
                </b>
                : <strong> {email}</strong>
              </li>
              <li>
                <b>
                  <Telephone /> 전화번호
                </b>
                : <strong> {phone}</strong>
              </li>
              <li>
                <b>
                  <People /> 소속팀
                </b>
                :<strong>{team}</strong>
              </li>
            </PersonalInfoList>
          </Card>

          <Card title={"근무일 및 휴가"}>
            <Grid $col="2">
              <PersonalInfoList>
                <li>
                  <b>이달의 예상 근무일</b> : <strong>20일</strong>
                </li>
                <li>
                  <b>이달의 근무일</b> : <strong>15일</strong>
                </li>
                <li>
                  <b>총 근무일</b> : <strong> 1,252일</strong>
                </li>
                <li>
                  <b>입사 일</b> : <strong> 2020년 2월 23일</strong>
                </li>
              </PersonalInfoList>
              <PersonalInfoList>
                <li>
                  <b>남은 휴가일</b> : <strong>2일</strong>
                </li>
                <li>
                  <b>전체 휴가일</b> : <strong>10일</strong>
                </li>
              </PersonalInfoList>
            </Grid>
          </Card>
<<<<<<< HEAD

          {!isAdmin && (
            <Card title={"이달의 급여"}>
              <ThisMonthSalary>
                ₩{sum ? sum.toLocaleString() : 0}<span>원</span>
              </ThisMonthSalary>
              <hr />
              <PersonalInfoList className="salary">
                <li>
                  <b>기본급</b> : {baseSalary ? <strong>{Number(baseSalary).toLocaleString()}원</strong>
                    : ''}
                </li>
                <li>
                  <b>성과급</b> : {bonusSalary ? <strong>{Number(bonusSalary).toLocaleString()}원</strong>
                    : ''}
                </li>
                <li>
                  <b>특별수당</b> : {SpecialSalary ? <strong>{Number(SpecialSalary).toLocaleString()}원</strong>
                    : ''}
                </li>
                <li>
                  <b>4대보험</b> : {insurance ? <strong>-{Number(insurance).toLocaleString()}원</strong>
                    : ''}
                </li>
                <li>
                  <b>소득세</b> : {tax ? <strong>-{Number(tax).toLocaleString()}원</strong>
                    : ''}
                </li>
              </PersonalInfoList>
            </Card>
          )}

=======
          <Card title={"이달의 급여"}>
            <ThisMonthSalary>
              ₩ {sum ? sum.toLocaleString() : 0}
              <span>원</span>
            </ThisMonthSalary>
            <hr />
            <PersonalInfoList className="salary">
              <li>
                <b>기본급</b> : {baseSalary ? <strong>{Number(baseSalary).toLocaleString()}원</strong> : ""}
              </li>
              <li>
                <b>성과급</b> : {bonusSalary ? <strong>{Number(bonusSalary).toLocaleString()}원</strong> : ""}
              </li>
              <li>
                <b>특별수당</b> : {SpecialSalary ? <strong>{Number(SpecialSalary).toLocaleString()}원</strong> : ""}
              </li>
              <li>
                <b>4대보험</b> : {insurance ? <strong>-{Number(insurance).toLocaleString()}원</strong> : ""}
              </li>
              <li>
                <b>소득세</b> : {tax ? <strong>-{Number(tax).toLocaleString()}원</strong> : ""}
              </li>
            </PersonalInfoList>
          </Card>
>>>>>>> feature/work
        </Left>
        <Right>
          <Card title={"My Project State"}>
            <BoardList state={"project"} />
          </Card>
          <Card title={"My Attendance State"}>
            <BoardList state="attendance" />
          </Card>
        </Right>
      </MypageWrap>
    </>
  );
}

export default Mypage;
