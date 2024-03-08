import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { FormText, Grid, GridColumnSpan } from "../../components/GlobalStyles";
import Avatar from "../../components/Avatar";
import mypageHeader from "../../assets/bg_profile.png";
import styled from "styled-components";
import { Button } from "../../components/GlobalStyles";

const SignHeader = styled.div``;
const SampleMypage = styled.div`
  position: relative;
  .skeleton {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr min-content;
    gap: 0.5rem 1rem;
    padding: 0.5rem;
    margin-top: -2rem;
    > div {
      background-color: var(--secondary);
      opacity: 0.2;
    }
    &__name {
      width: 5rem;
      height: 1rem;
      align-self: end;
    }
    &__info {
      width: 10rem;
      height: 0.5rem;
    }
  }
  button {
    grid-row: span 2;
    border-radius: 0.375rem;
    width: 5rem;
    height: 5rem;
    pointer-events: none;
    cursor: auto;
  }
  img {
    width: 100%;
  }
`;

const JoinThird = () => {
    return (
        <>
            <SignHeader>
                <Heading size={"sm"} tag={"h2"}>
                    사진 업로드
                </Heading>
                <p className="mb3">본인 인증을 위한 사진을 업로드하세요.</p>
            </SignHeader>
            <Grid $col="2" className="mb3">
                <GridColumnSpan $span="2">
                    <SampleMypage>
                        <img src={mypageHeader} alt="" />
                        <div className="skeleton">
                            <Avatar $size="md" />
                            <div className="skeleton__name"></div>
                            <div className="skeleton__info"></div>
                        </div>
                    </SampleMypage>
                </GridColumnSpan>
                <div>
                    <Input type="file" label="file1" labelText="Profile Image" />
                    <FormText $error>프로필 사진을 올려주세요.</FormText>
                </div>
                <div>
                    <Input type="file" label="file2" labelText="Mypage Background Image" />
                    <FormText $error>마이페이지 배경이미지를 올려주세요.</FormText>
                </div>
            </Grid>
            <div className="align both">
                <Button $color="secondary" >
                    이전
                </Button>
                <Button $color="primary" >
                    완료
                </Button>
            </div>
        </>
    )
}

export default JoinThird
