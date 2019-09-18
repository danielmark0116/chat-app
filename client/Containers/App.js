import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

import Login from './Login';
import Chat from './Chat';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: null,
      messages: [],
      userDisconnected: false
    };
  }

  componentDidMount() {
    socket.on('message', msgObject => this.handleNewMessage(msgObject));
    socket.on('update', usersObject => this.handleUpdate(usersObject.users));
    socket.on('userDisconnected', bool => this.handleUserDisconnect(bool));
  }

  componentDidUpdate() {
    if (socket.disconnected) {
      this.setState({
        userDisconnected: true
      });
    }
  }

  handleUserDisconnect = bool => {
    this.setState({
      userDisconnected: bool
    });
  };

  handleUpdate = users => {
    this.setState({
      users: users
    });
  };

  handleNewMessage = msgObject => {
    const { messages } = this.state;

    this.setState({
      messages: [...messages, msgObject]
    });
  };

  enterChat = name => {
    this.setState({
      name: name
    });
    socket.emit('join', name);
  };

  render() {
    const { name, users, messages, userDisconnected } = this.state;

    if (name === null || userDisconnected)
      return <Login enterChat={this.enterChat} />;

    return (
      <Chat
        activeUser={name}
        socket={socket}
        users={users}
        messages={messages}
      />
    );
  }
}

export default hot(module)(App);
