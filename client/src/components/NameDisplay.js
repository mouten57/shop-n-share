import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

class NameDisplay extends Component {
  rendercontent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <p />;
      default:
        return (
          <Header as="h2" size="small">
            <Image circular src={this.props.auth.image} /> Logged in as:{' '}
            {this.props.auth.name}
          </Header>
        );
    }
  };
  render() {
    return <div>{this.rendercontent()}</div>;
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(NameDisplay);
