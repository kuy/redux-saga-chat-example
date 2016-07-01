import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { Welcome, Room } from './views';
import { logout } from './actions';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    const { username, connecting } = this.props;

    let body, right;
    if (username) {
      if (connecting) {
        
        
        body = <div style={{ display: 'flex' }}><div style={{ flex: 1 }}/><CircularProgress /><div style={{ flex: 1 }}/></div>;
      }
      else {
        body = <Room />;
      }
      right = <FlatButton label="Logout" onTouchTap={this.handleLogout.bind(this) } />;
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
