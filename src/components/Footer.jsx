import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrap = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  block-size: 56px;
  color: var(--secondary);
  svg {
    width: 1.5rem;
    margin: 0 0.5rem;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const FooterNav = styled.ul`
  display: flex;
  gap: 1.5rem;
`;
const FooterNavItem = styled.li``;

function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <>
      <FooterWrap>
        <div>
          &copy;{thisYear}{" "}
          <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="#7367F0"></path>
            <path opacity="0.06" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"></path>
            <path opacity="0.06" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"></path>
            <path d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0"></path>
          </svg>{" "}
          Intranet
        </div>
        <nav>
          <FooterNav>
            <FooterNavItem>
              <Link to={"/"}>About Us</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link to={"/styleguide"}>StyleGuide</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link to={"/"}>Github</Link>
            </FooterNavItem>
          </FooterNav>
        </nav>
      </FooterWrap>
    </>
  );
}

export default Footer;