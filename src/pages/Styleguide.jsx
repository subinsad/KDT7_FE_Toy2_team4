import { Badge, Button, Container, FormText, Grid, GridColumnSpan, GridRowSpan, Main } from "../components/GlobalStyles";
import { Backpack, Bell, Check, Diagram2, Star } from "react-bootstrap-icons";
import Heading from "../components/Heading";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Gnb from "../components/Gnb";
import Input from "../components/Input";
import Card from "../components/Card";
import Select from "../components/Select";

function StyleGuide() {
  const optionArray = [
    {
      value: "select1",
      text: "선택하세요1",
    },
    {
      value: "select2",
      text: "선택하세요2",
    },
    {
      value: "select3",
      text: "선택하세요3",
    },
  ];
  return (
    <>
      <Gnb />
      <Main>
        <NavBar />
        <Container>
          <Heading size={"xl"} tag={"h1"}>
            Heading
          </Heading>
          <Heading size={"xl"} tag={"h1"}>
            Heading xl h1
          </Heading>
          <Heading size={"lg"} tag={"h2"}>
            Heading lg h2
          </Heading>
          <Heading tag={"h3"}>Heading h3</Heading>
          <Heading size={"sm"} tag={"h4"}>
            Heading sm h4
          </Heading>
          <Heading size={"xs"} tag={"h5"}>
            Heading xs h5
          </Heading>
          <br />
          <br />
          <br />
          <Heading size={"xl"} tag={"h1"}>
            Buttons
          </Heading>
          <Button $color="primary">primary</Button>
          <Button $color="secondary">secondary</Button>
          <Button $color="success">success</Button>
          <Button $color="danger">danger</Button>
          <Button $color="warning">warning</Button>
          <Button $color="info">info</Button>
          <Button $color="dark">dark</Button>
          <br />
          <br />
          <Button $color="primary" $outline>
            primary
          </Button>
          <Button $color="secondary" $outline>
            secondary
          </Button>
          <Button $color="success" $outline>
            success
          </Button>
          <Button $color="danger" $outline>
            danger
          </Button>
          <Button $color="warning" $outline>
            warning
          </Button>
          <Button $color="info" $outline>
            info
          </Button>
          <Button $color="dark" $outline>
            dark
          </Button>
          <br />
          <br />
          아이콘은 Bootstrap Icon으로 삽입하세요. <br />
          https://icons.getbootstrap.com/
          <br />
          <Button $color="primary">
            <Star />
            primary
          </Button>
          <Button $color="secondary">
            <Bell />
            secondary
          </Button>
          <br />
          <br />
          <Button $color="primary" $size="xl">
            Button xl
          </Button>
          <Button $color="primary" $size="lg">
            Button lg
          </Button>
          <Button $color="primary">Button</Button>
          <Button $color="primary" $size="sm">
            Button sm
          </Button>
          <Button $color="primary" $size="xs">
            Button xs
          </Button>
          <br />
          <br />
          <Button $color="primary" disabled>
            disabled
          </Button>
          <br />
          <br />
          <br />
          <Heading size={"xl"} tag={"h1"}>
            Badges
          </Heading>
          <Badge $color="primary">primary</Badge>
          <Badge $color="secondary">secondary</Badge>
          <Badge $color="success">success</Badge>
          <Badge $color="danger">danger</Badge>
          <Badge $color="warning">warning</Badge>
          <Badge $color="info">info</Badge>
          <Badge $color="dark">dark</Badge>
          <br />
          <br />
          <Button $color="primary">
            Text
            <Badge $color="primary">12</Badge>
          </Button>
          <br />
          <br />
          <br />
          <Heading size={"xl"} tag={"h1"}>
            Alerts
          </Heading>
          <Alert color="primary">primary색상의 경고디자인</Alert>
          <Alert color="secondary">secondary색상의 경고디자인</Alert>
          <Alert color="success">success색상의 경고디자인</Alert>
          <Alert color="danger">danger색상의 경고디자인</Alert>
          <Alert color="warning">warning색상의 경고디자인</Alert>
          <Alert color="info">info색상의 경고디자인</Alert>
          <Alert color="dark">dark색상의 경고디자인</Alert>
          <br />
          <br />
          <Alert color="primary" close>
            primary색상의 경고디자인
          </Alert>
          <Alert color="secondary" close>
            secondary색상의 경고디자인
          </Alert>
          <Alert color="success" close>
            success색상의 경고디자인
          </Alert>
          <Alert color="danger" close>
            danger색상의 경고디자인
          </Alert>
          <Alert color="warning" close>
            warning색상의 경고디자인
          </Alert>
          <Alert color="info" close>
            info색상의 경고디자인
          </Alert>
          <Alert color="dark" close>
            dark색상의 경고디자인
          </Alert>
          <br />
          <br />
          <Alert color="primary" close title="primary색상의 경고디자인">
            <Backpack />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolorem consequuntur porro quisquam, vero modi natus corrupti, neque qui ut nesciunt quo? Accusamus nostrum minima alias officiis iure, saepe ipsam!
          </Alert>
          <Alert color="secondary" close title="secondary색상의 경고디자인">
            <Diagram2 />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et iste porro suscipit ipsum labore reprehenderit ut non, aliquam vitae animi iure nulla molestias officia unde, ea dolores mollitia quae soluta.
          </Alert>
          <Alert color="success" close title="success색상의 경고디자인">
            <Check />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor veniam pariatur neque ut rerum? Necessitatibus nobis excepturi quo sequi ea, repellat, voluptatibus cum accusantium impedit fugiat id laudantium rerum nostrum!
          </Alert>
          <br />
          <br />
          <br />
          <Heading size={"xl"} tag={"h1"}>
            Form Elements
          </Heading>
          <Grid $col="2">
            <Card title="Default">
              <div className="mb3">
                <Input type="text" label="default" labelText="Name" />
                <FormText>10자 이상입력</FormText>
              </div>
              <Input type="password" />
              <FormText $error>비밀번호 입력이 틀렸습니다.</FormText>
            </Card>
            <Card title="Form Controls">
              <div className="mb3">
                <Input type="text" label="default" labelText="Email Address" />
              </div>
              <div className="mb3">
                <Input type="text" label="default2" labelText="Readonly" readonly="readonly" placeholder="Readonly input here..." />
              </div>
              <div className="mb3">
                <Input type="text" plainText label="default3" labelText="Readonly" readonly="readonly" value="Plain Text" />
              </div>
              <div className="mb3">
                <Select options={optionArray} label="default4" labelText="Example select" />
              </div>
            </Card>
            <GridColumnSpan $span="2">
              <Card title="Form Controls">
                <Input type="text" label="default" labelText="Name" />
                <FormText>10자 이상입력</FormText>
                <Input type="password" />
                <FormText $error>비밀번호 입력이 틀렸습니다.</FormText>
              </Card>
            </GridColumnSpan>
          </Grid>
          <Footer />
        </Container>
      </Main>
    </>
  );
}

export default StyleGuide;
