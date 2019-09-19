import * as React from 'react';
import { useState, Fragment } from 'react';

import * as style from '../styles/main.scss';

import { SocketObject } from '../interfaces/SocketInterface';

interface IProps {
  socket: SocketObject;
}

export default function NewMessage(props: IProps) {
  const [newMessage, handleInput] = useState('');

  return (
    <Fragment>
      <form
        className={style.MessageForm}
        onSubmit={e => {
          e.preventDefault();
          if (newMessage.length > 0) {
            handleInput('');
            props.socket.emit('message', newMessage);
          }
        }}
      >
        <input
          className={style.MessageInput}
          type="text"
          value={newMessage}
          onChange={e => handleInput(e.target.value)}
        />
        <button>SEND</button>
      </form>
    </Fragment>
  );
}
