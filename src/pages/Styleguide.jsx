import { Badge, Button, Container, FormText, Grid, GridColumnSpan, Main } from "../components/GlobalStyles";
import { Backpack, Bell, Check, Diagram2, Star } from "react-bootstrap-icons";
import Heading from "../components/Heading";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Gnb from "../components/Gnb";
import Input from "../components/Input";
import Card from "../components/Card";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import Editor from "../components/Editor";
import Avatar, { AvatarGroup } from "../components/Avatar";
import BoardList from "../components/BoardList";
import Loading from "../components/Loading";
import { useState } from "react";
import Dialog from "../components/Dialog";
import { Link } from "react-router-dom";

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

function StyleGuide() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const showLoading = () => {
    setLoading(!loading);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const openAlert = () => {
    setAlert(true);
  };

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

          <Link to="https://icons.getbootstrap.com/" target="_blank">
            아이콘은 Bootstrap Icon으로 삽입하세요.{" "}
          </Link>
          <br />
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
            Avatar
          </Heading>
          <Avatar size={"xs"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <Avatar size={"sm"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <Avatar size={"md"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <Avatar size={"lg"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <Avatar size={"xl"} src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
          <br />
          <br />
          <Avatar size={"xs"} />
          <Avatar size={"sm"} />
          <Avatar />
          <Avatar size={"md"} />
          <Avatar size={"lg"} />
          <Avatar size={"xl"} />
          <br />
          <br />
          <AvatarGroup>
            <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} name={"ok madam"} />
            <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} name={"sorry guy"} />
            <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} name={"i hate work"} />
          </AvatarGroup>
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
              <div className="mb3">
                <Textarea label={"default5"} labelText={"Example Textarea"} rows="3"></Textarea>
              </div>
            </Card>
            <Card title="Checkbox">
              <div className="mb3">
                <Checkbox value="Unchecked" id="id1" color="primary" />
              </div>
              <div className="mb3">
                <Checkbox value="checked" id="id2" color="primary" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="disabled" id="id3" color="primary" checked={true} disabled />
              </div>
              <div className="mb3">
                <Checkbox value="disabled" id="id4" color="primary" disabled />
              </div>
              <br />
              <br />
              <div className="mb3">
                <Checkbox value="primary" id="id5" color="primary" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="secondary" id="id6" color="secondary" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="success" id="id7" color="success" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="danger" id="id8" color="danger" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="warning" id="id9" color="warning" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="info" id="id10" color="info" checked={true} />
              </div>
              <div className="mb3">
                <Checkbox value="dark" id="id11" color="dark" checked={true} />
              </div>
            </Card>
            <Card title="RadioButton">
              <div className="mb3">
                <Radio value="Unchecked" id="ra1" name="rag1_1" color="primary" />
              </div>
              <div className="mb3">
                <Radio value="checked" id="ra2" name="rag1_1" color="primary" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="disabled" id="ra3" name="rag1" color="primary" checked={true} disabled />
              </div>
              <div className="mb3">
                <Radio value="disabled" id="ra4" name="rag1" color="primary" disabled />
              </div>
              <br />
              <br />
              <div className="mb3">
                <Radio value="primary" id="ra5" name="rag2" color="primary" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="secondary" id="ra6" name="rag3" color="secondary" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="success" id="ra7" name="rag4" color="success" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="danger" id="ra8" name="rag5" color="danger" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="warning" id="ra9" name="rag6" color="warning" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="info" id="ra10" name="rag7" color="info" checked={true} />
              </div>
              <div className="mb3">
                <Radio value="dark" id="ra11" name="rag8" color="dark" checked={true} />
              </div>
            </Card>
            <Card title="Inputs">
              <div className="mb3">
                <Input type="text" label="text1" labelText="text" />
              </div>
              <div className="mb3">
                <Input type="password" label="password" labelText="password" />
              </div>
              <div className="mb3">
                <Input type="email" label="email" labelText="email" />
              </div>
              <div className="mb3">
                <Input type="url" label="url" labelText="url" />
              </div>
              <div className="mb3">
                <Input type="phone" label="phone" labelText="phone" />
              </div>
              <div className="mb3">
                <Input type="number" label="number" labelText="number" />
              </div>
              <div className="mb3">
                <Input type="color" label="color" labelText="color" />
              </div>
            </Card>
            <Card title="ETC Input">
              <div className="mb3">
                <Input type="file" label="file" labelText="file" />
              </div>
              <div className="mb3">
                <Input type="file" label="file" labelText="file disabled" disabled />
              </div>
              <div className="mb3">
                <Input type="password" label="password" labelText="Password" showPassword />
              </div>
              <div>
                <Editor></Editor>
              </div>
            </Card>
            <GridColumnSpan $span="2">
              <Card title="Table">
                <BoardList />
              </Card>
            </GridColumnSpan>
            <Card title="Loading">
              <Button $color="primary" onClick={showLoading}>
                Loading
              </Button>
              {loading && <Loading />}
            </Card>
            <Card title="Popup">
              <Button $color="primary" popovertarget="dialog">
                Popup
              </Button>
              <Dialog id={"dialog"}>
                팝업내용입력
                <div>
                  <Button $color="success" $size="sm" popovertarget="dialog" popovertargetaction="hide" className="mr2">
                    Submit
                  </Button>
                  <Button $color="secondary" $size="sm" popovertarget="dialog" popovertargetaction="hide">
                    Close
                  </Button>
                </div>
              </Dialog>
            </Card>
          </Grid>
          <Footer />
        </Container>
      </Main>
    </>
  );
}
export default StyleGuide;
