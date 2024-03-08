import Heading from "../Heading";
import { Button } from "../GlobalStyles";
import { ChatLeftHeart } from "react-bootstrap-icons";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const rotate = keyframes`
  0% {
    transform: rotateY(0);
  }
  80% {
    transform: rotateY(360deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const DoneJoin = styled.div`
  line-height: 1.4;
  text-align: left;
  svg {
    display: block;
    margin: 0.5rem 0;
    font-size: 3rem;
    color: var(--danger);
    path:last-child {
      animation: ${rotate} infinite 1s;
      transform-box: fill-box;
      transform-origin: center;
    }
  }
  button {
    margin-top: 1rem;
  }
`;

const JoinComplete = () => {
    const navigate = useNavigate();

    const gotoLogin = () => {
        navigate("/main");
    };
    return (
        <>
            <Heading size={"sm"} tag={"h2"}>
                회원가입 완료
            </Heading>
            <DoneJoin className="mb3">
                <ChatLeftHeart />
                4U Team의 일원이 되신것을 환영합니다.
                <br />
                함께 성장하고 꿈을 이뤄봅시다.
                <br />
                <Button $color="primary" onClick={gotoLogin}>
                    메인으로
                </Button>
            </DoneJoin>
        </>
    )
}

export default JoinComplete
