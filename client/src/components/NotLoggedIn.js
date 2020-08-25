import React from "react";
import { Message, Container, Button, Icon } from "semantic-ui-react";

const Landing = (props) => {
  return (
    <Container>
      <Message
        icon="thumbs down"
        header="Error: You need to login!"
        content="Login so you can see the family shopping list!"
      />

      <Button.Group fluid>
        <Button color="green" onClick={props.onSkipLogin}>
          Skip Login
        </Button>
        <Button.Or />
        <Button color="primary" as="a" href="/auth/google">
          Login with Google
          <Icon name="google plus" style={{ marginLeft: "5px" }} />
        </Button>
      </Button.Group>
    </Container>
  );
};

export default Landing;
