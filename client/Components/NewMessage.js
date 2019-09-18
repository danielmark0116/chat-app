import React, { useState, Fragment } from 'react';

import style from '../styles/main.scss';

export default function NewMessage(props) {
  const [newMessage, handleInput] = useState('');

  return (
    <Fragment>
      <form
        className={style.MessageForm}
        onSubmit={e => {
          e.preventDefault();

          handleInput('');
          props.socket.emit('message', newMessage);
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
