import styled from "styled-components";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import BoardList from "../components/Board/BoardList";
import { Badge, Button, Grid, GridColumnSpan } from "../components/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { BarChart, Calendar2, CardList, Mailbox, MailboxFlag, People, Person, PersonBadge, PersonWorkspace, Telephone } from "react-bootstrap-icons";
import bg from "../assets/bg_profile.png";
import MypageHeader from "./MypageHeader";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

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
//수정
function Mypage() {
  const { name, email, team, position, phone } = useSelector((state) => state.userSlice.userInfo);
  const { baseSalary, bonusSalary, SpecialSalary } = useSelector((state) => state.salarySlice.salary);
  const { isAdmin, isAdminLoading } = useSelector((state) => state.userSlice);

  const calTax = useMemo(() => {
    const totalSalary = Number(baseSalary) + Number(bonusSalary) + Number(SpecialSalary);
    const insurance = parseInt(totalSalary * 0.06);
    const tax = parseInt(totalSalary * 0.04);
    const sum = totalSalary - insurance - tax;
    return { insurance, tax, sum };
  }, [baseSalary, bonusSalary, SpecialSalary]);

  const { insurance, tax, sum } = calTax;
  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  return (
    <>
      <MypageWrap>
        <MypageHeader data-aos="fade-down" />
        {isAdmin ? (
          <GridColumnSpan $span="2">
            <Card className="person-info" title={"Details"} data-aos="fade-right" data-aos-delay="200">
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
          </GridColumnSpan>
        ) : (
          <>
            <Left>
              <Card className="person-info" title={"Details"} data-aos="fade-right" data-aos-delay="200">
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

              <Card title={"이달의 급여"} data-aos="fade-right" data-aos-delay="400">
                <ThisMonthSalary>
                  ₩{sum ? sum.toLocaleString() : 0}
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
            </Left>
            <Right>
              <Card title={"My Project State"} data-aos="fade-left" data-aos-delay="400">
                <BoardList state={"project"} />
              </Card>
              <Card title={"My Attendance State"} data-aos="fade-left" data-aos-delay="600">
                <BoardList state="attendance" />
              </Card>
            </Right>
          </>
        )}
      </MypageWrap>
    </>
  );
}

export default Mypage;
