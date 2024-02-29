import GlobalStyles, { Badge, Button } from "./components/GlobalStyles";
import { Bell, Star } from "react-bootstrap-icons";

function App() {
  return (
    <>
      <GlobalStyles />
      <h2>Buttons</h2>
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
      <Button $color="primary" $icon>
        <Star />
        primary
      </Button>
      <Button $color="secondary" $icon>
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
      <h2>Badges</h2>
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
    </>
  );
}

export default App;
