import React from 'react';
import { Message, Container, Button, Icon } from 'semantic-ui-react';

const Landing = () => {
  return (
    <Container>
      <Message
        icon="thumbs down"
        header="Error: You need to login!"
        content="Login so you can see the family shopping list!"
      />

      <a href="/auth/google" style={{ color: 'white' }}>
        <Button color="google plus" fluid>
          Login with Google
          <Icon name="google plus" style={{ marginLeft: '5px' }} />
        </Button>
      </a>
    </Container>
  );
};

export default Landing;
