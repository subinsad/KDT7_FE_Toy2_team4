import { ArrowDownLeftSquare, Bell, BoxArrowInLeft, BoxArrowInRight, BoxArrowRight, LightbulbOff, Outlet, PersonBadge, PersonCheck, SignNoLeftTurn, Unlock, X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

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
    content: "";
    width: 100%;
    height: 4.875rem;
    position: fixed;
    top: -1rem;
    z-index: 10;
    backdrop-filter: saturate(200%) blur(10px);
    background: linear-gradient(180deg, rgba(248, 247, 250, 0.7) 44%, rgba(248, 247, 250, 0.43) 73%, rgba(248, 247, 250, 0));
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
          <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} popovertarget="avatar" />
          <AvatarList popover="auto" id="avatar">
            <ul>
              <li>
                <Link to={""}>
                  <PersonCheck /> My Profile
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <BoxArrowRight /> Log Out
                </Link>
              </li>
            </ul>
          </AvatarList>
        </nav>
      </NavBarWrap>
    </>
  );
}
export default NavBar;
