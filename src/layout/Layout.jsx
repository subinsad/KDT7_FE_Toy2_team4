import { Outlet } from "react-router-dom";
import { Container, Main } from "../components/GlobalStyles";
import Gnb from "./Gnb";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Gnb />
      <Main>
        <NavBar />
        <Container>
          <Outlet />
          <Footer />
        </Container>
      </Main>
    </>
  );
};

export default Layout;
