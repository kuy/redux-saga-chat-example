import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { Welcome, Room } from './views';
import { logout } from './actions';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    const { username } = this.props;

    let body, right;
    if (username) {
      body = <Room />;
      right = <FlatButton label="Logout" onTouchTap={this.handleLogout.bind(this)} />;
    } else {
      body = <Welcome />;
    }

    return (
      <div>
        <AppBar
          title="Chat"
          iconElementRight={right}
        />
        {body}
      </div>
    );
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
