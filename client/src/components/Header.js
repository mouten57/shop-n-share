import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SignInButton from './SignInButton';
import NewItemButton from './NewItemButton';

class Nav extends Component {
  render() {
    return (
      <Menu borderless>
        <Menu.Item>
          <Header as="h2">Shop-n-Share</Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item fitted>
            <SignInButton auth={this.props.auth} />
          </Menu.Item>
          {this.props.auth ? (
            <Menu.Item fitted>
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
