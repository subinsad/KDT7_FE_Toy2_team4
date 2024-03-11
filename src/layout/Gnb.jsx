import { BoxArrowInRight, Gear, Memory, Motherboard, PersonBoundingBox, PersonUp, PersonWorkspace, SegmentedNav, Stripe, Wallet } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Heading from "../components/Heading";
import { useSelector } from "react-redux";
const AsideNav = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 0.875rem 0 1rem;
  width: 16.25rem;
  height: 100vh;
  overflow: auto;
  background-color: var(--white);
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
  h3 {
    color: #93909e;
    padding: 1.25rem 1.75rem 0.375rem;
    font-size: 0.8125rem;
  }
`;
const Logo = styled.h1`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    height: 64px;
    font-size: 1.5rem;
    font-weight: 300;
    white-space: nowrap;
    letter-spacing: -0.05rem;
  }
`;
const NavItem = styled.li`
  margin: 0.125rem 0;
  a {
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9375rem;
    padding: 0.5rem 1rem;
    color: #6f6b7d;
    font-weight: 500;
    line-height: 1.47;
    svg {
      width: 1.1rem;
      height: 1.1rem;
    }
    &:hover {
      background-color: #f8f8f8;
    }
  }
  ${({ $active }) =>
    $active &&
    css`
      a {
        background: linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%);
        box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.48);
        color: #fff;
      }
    `}
`;
function Gnb() {
  const location = useLocation();
  const { isAdmin } = useSelector((state) => state.userSlice)


  return (
    <>
      <AsideNav>
        <Logo>
          <Link to="/main">
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="#7367F0"></path>
              <path opacity="0.06" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"></path>
              <path opacity="0.06" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"></path>
              <path d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0"></path>
            </svg>
            4U Team Intranet
          </Link>
        </Logo>
        <Heading size={"xs"} tag={"h3"}>
          COMPANY
        </Heading>
        <ul>
          <NavItem $active={location.pathname.includes("/main")}>
            <Link to="/main">
              <Motherboard /> Dashboard
            </Link>
          </NavItem>
          <NavItem $active={location.pathname.includes("/work")}>
            <Link to="work">
              <PersonWorkspace /> Work Management
            </Link>
          </NavItem>
          <NavItem $active={location.pathname.includes("/attendance")}>
            <Link to="attendance">
              <PersonUp /> Attendance
            </Link>
          </NavItem>

          {isAdmin ?
            (<NavItem $active={location.pathname.includes("/salary")}>
              <Link to="/salaryAdmin">
                <Wallet /> Salary
              </Link>
            </NavItem>) :

            <NavItem $active={location.pathname.includes("/salary")}>
              <Link to="/salary">
                <Wallet /> Salary
              </Link>
            </NavItem>}

        </ul>
        <Heading size={"xs"} tag={"h3"}>
          PERSONAL
        </Heading>
        <ul>

          <NavItem $active={location.pathname.includes("/mypage")}>
            <Link to="mypage">
              <Gear /> Mypage
            </Link>
          </NavItem>

        </ul>
      </AsideNav>
    </>
  );
}

export default Gnb;
