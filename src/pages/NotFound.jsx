import React from "react";
import { Button } from "../components/GlobalStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import page404Img from "../assets/picture3.png";

const NotFoundPage = styled.div`
  display: grid;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  strong {
    font-size: 2rem;
    color: #5d596c;
    font-weight: 700;
  }
  p {
    padding: 1rem 0 0;
    color: #6f6b7d;
  }
  ${Button} {
    justify-self: center;
    margin: 2rem 0 3.5rem;
  }
  img {
    width: 225px;
    justify-self: center;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/main");
  };

  return (
    <NotFoundPage>
      <strong>Page Not Found :( </strong>
      <p>앗! 😖 요청한 URL을 이 서버에서 찾을 수 없습니다.</p>
      <Button $color="primary" onClick={gotoHome}>
        첫페이지 바로가기
      </Button>
      <img src={page404Img} alt="" />
    </NotFoundPage>
  );
};

export default NotFound;
