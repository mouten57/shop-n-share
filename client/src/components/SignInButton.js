import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class SignInButton extends Component {
  renderContent = () => {
    switch (this.props.auth || this.props.fakeAuth) {
      case null:
        return;
      case false:
        return (
          <Button
            size="small"
            as="a"
            color="primary"
            href="/auth/google"
            style={{ padding: "10px" }}
          >
            Login
          </Button>
        );
      default:
        if (this.props.fakeAuth) {
          var link = "#";
          var clickAction = this.props.onSkipLogin;
        } else {
          var link = "/api/logout";
        }
        return (
          <Button
            as={Icon}
            name="sign out"
            size="small"
            onClick={clickAction}
            href={link}
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
