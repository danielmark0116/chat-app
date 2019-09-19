import * as React from 'react';
import { Component } from 'react';
import { hot } from 'react-hot-loader';
const io = require('socket.io-client');

import { MsgObject } from '../interfaces/MsgInterface';
import { UserObject } from '../interfaces/UserInterface';
import { SocketObject } from '../interfaces/SocketInterface';

import Login from './Login';
import Chat from './Chat';

const socket: SocketObject = io('/');

interface IState {
  users: Array<UserObject>;
  name: string;
  messages: Array<MsgObject>;
  userDisconnected: boolean;
}

interface IProps {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      users: [],
      name: null,
      messages: [],
      userDisconnected: false
    };
  }

  componentDidMount() {
    socket.on('message', (msgObject: MsgObject) =>
      this.handleNewMessage(msgObject)
    );
    socket.on('update', (usersObject: Array<UserObject>) =>
      this.handleUpdate(usersObject)
    );
    socket.on('userDisconnected', (bool: boolean) =>
      this.handleUserDisconnect(bool)
    );
  }

  componentDidUpdate() {
    if (socket.disconnected) {
      this.setState({
        userDisconnected: true
      });
    }
  }

  handleNewMessage = (msgObject: MsgObject) => {
    const { messages } = this.state;

    this.setState({
      messages: [...messages, msgObject]
    });
  };

  handleUpdate = (users: Array<UserObject>) => {
    this.setState({
      users: users
    });
  };

  handleUserDisconnect = (bool: boolean) => {
    this.setState({
      userDisconnected: bool
    });
  };

  disconnectFromChannel = () => {
    socket.emit('leaveChat');
  };

  enterChat = (name: string) => {
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
        disconnectFromChannel={this.disconnectFromChannel}
        activeUser={name}
        socket={socket}
        users={users}
        messages={messages}
      />
    );
  }
}

export default hot(module)(App);
