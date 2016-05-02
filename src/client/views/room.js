import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { TextField, FlatButton } from 'material-ui';
import { sendMessage } from '../actions';

class Room extends Component {
  handleSend() {
    const text = document.getElementById('room-message').value;
    this.props.dispatch(sendMessage({ text }));
  }

  render() {
    const { users, messages } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '400px' }}>
          <List>
            {Object.keys(users).map((username, i) =>
              <ListItem primaryText={username} key={`${i}:${username}`} />
            )}
          </List>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
              <List>
                {messages.list.map(id => messages.entities[id]).map((m, i) =>
                  <ListItem
                    primaryText={m.text}
                    secondaryText={m.username}
                    key={`${i}:${m.id}`}
                  />
                )}
              </List>
            </div>
            <div style={{ height: '120px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <TextField id="room-message" fullWidth={true} hintText="Message" />
                </div>
                <div style={{ width: '80px' }}>
                  <FlatButton label="Send" onTouchTap={this.handleSend.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function select({ users, messages }) {
  return { users, messages };
}

export default connect(select)(Room);
