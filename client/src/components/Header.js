import React, { Component } from "react";
import { Header, Menu, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import SignInButton from "./SignInButton";
import NewItemButton from "./NewItemButton";

class Nav extends Component {
  render() {
    return (
      <Menu borderless>
        <Menu.Item>
          <Header as="h2">Shop-n-Share</Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button.Group>
              <SignInButton
                onSkipLogin={this.props.onSkipLogin}
                auth={this.props.auth}
                fakeAuth={this.props.fakeAuth}
              />
            </Button.Group>
          </Menu.Item>
          {this.props.auth || this.props.fakeAuth ? (
            <Menu.Item>
              <NewItemButton
                buttonName={this.props.newItemName}
                onButtonClick={this.props.onNewItemClick}
              />
            </Menu.Item>
          ) : null}
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Nav);
