import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class SignInButton extends Component {
  renderContent = () => {
    console.log(this.props.auth)
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Button
            size="small"
            as="a"
            href="/auth/google"
            primary
            style={{ padding: '10px' }}
          >
            Login
          </Button>
        );
      default:
        return (
          <Button
            as={Icon}
            name="sign out"
            size="small"
            href="/api/logout"
            primary
          >
            <Icon name="sign out" />
          </Button>
        );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SignInButton;
