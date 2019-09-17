import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

const socket = io('/');

// STYLES
import style from '../styles/main.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      state: 'test'
    };
  }

  componentDidMount() {
    socket.on('mesage', () => console.log('messagesd'));
    socket.on('update', users => this.handleUpdate(users));
  }

  handleUpdate = users => {
    console.log(users);
  };

  render() {
    return (
      <Fragment>
        <h2 className={style.main}>CHAT APP</h2>
        <button
          onClick={() => {
            socket.emit('join', 'testowe imie');
          }}
        >
          login
        </button>
        <button
          onClick={() => {
            socket.emit('message', 'sdfiuh');
          }}
        >
          send message
        </button>
      </Fragment>
    );
  }
}

export default hot(module)(App);
