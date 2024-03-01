import { Link, Route, Routes } from "react-router-dom";
import StyleGuide from "./pages/Styleguide";
import GlobalStyles from "./components/GlobalStyles";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <>
      <GlobalStyles />

      <Link to="/styleguide">스타일가이드 바로가기</Link>
      <Routes>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/styleguide" element={<StyleGuide />} />
      </Routes>
    </>
  );
}

export default App;
