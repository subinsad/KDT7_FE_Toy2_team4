import { useNavigate } from "react-router-dom";
import { Button, FormText, Grid } from "../components/GlobalStyles";
import Select from "../components/Select";
import Input from "../components/Input";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import MypageHeader from "./MypageHeader";

const optionTeam = [
  {
    value: "team0",
    text: "기획팀",
  },
  {
    value: "team1",
    text: "개발팀",
  },
  {
    value: "team2",
    text: "디자인팀",
  },
  {
    value: "team3",
    text: "운영팀",
  },
  {
    value: "team4",
    text: "회계팀",
  },
];
const optionPosition = [
  {
    value: "position1",
    text: "인턴",
  },
  {
    value: "position2",
    text: "사원",
  },
  {
    value: "position3",
    text: "대리",
  },
  {
    value: "position4",
    text: "과장",
  },
  {
    value: "position5",
    text: "팀장",
  },
  {
    value: "position6",
    text: "차장",
  },
  {
    value: "position7",
    text: "부장",
  },
];
const MypageEdit = () => {
  const navigate = useNavigate();
  const Back = () => {
    navigate("/mypage");
  };
  return (
    <>
      <MypageHeader className="mb3" />

      <Card title={"회원정보수정"}>
        <Grid $col="2" className="mb5">
          <div>
            <Select options={optionTeam} label="team" labelText="Team" />
            <FormText $error>소속을 선택해 주세요.</FormText>
          </div>
          <div>
            <Select options={optionPosition} label="team" labelText="Job Position" />
            <FormText $error>직급을 입력해주세요.</FormText>
          </div>
          <div>
            <Input type="tel" label="tel" labelText="Phone" placeholder="000-0000-0000" value="010-1234-1234" />
            <FormText $error>휴대폰번호를 입력해 주세요.</FormText>
          </div>
          <div>
            <Input type="text" label="shortInfo" labelText="Short Words" placeholder="프로필 한줄 소개" value="한줄소개를 넣어보았오." />
            <FormText $error>프로필 한줄글을 입력해주세요.</FormText>
          </div>
          <div>
            <Input type="file" label="file1" labelText="Profile Image" />
            <FormText $error>프로필 사진을 올려주세요.</FormText>
          </div>
          <div>
            <Input type="file" label="file2" labelText="Mypage Background Image" />
            <FormText $error>마이페이지 배경이미지를 올려주세요.</FormText>
          </div>
        </Grid>
        <div className="align">
          <Button $color={"primary"} className="mr2">
            회원정보수정
          </Button>
          <Button $color={"secondary"} onClick={Back}>
            취소
          </Button>
        </div>
      </Card>
    </>
  );
};

export default MypageEdit;
