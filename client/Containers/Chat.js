import React, { useState, useEffect, Fragment } from 'react';

import Messages from '../Components/Messages';
import NewMessage from '../Components/NewMessage';

import style from '../styles/main.scss';

export default function Chat(props) {
  return (
    <div className={style.App}>
      <h1>chat room</h1>
      <button onClick={props.disconnectFromChannel}>
        Disconnect from the chat
      </button>
      <h3>active users</h3>
      <div className={style.AppBody}>
        <div className={style.Users}>
          <div className={style.UsersOnline}>
            {props.users.length} people online
          </div>
          <ul className={style.UsersList}>
            {props.users.map(user => (
              <li key={user.id} className={style.UserItem}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.MessageWrapper}>
          <Messages activeUser={props.activeUser} messages={props.messages} />
          <NewMessage socket={props.socket}></NewMessage>
        </div>
      </div>
    </div>
  );
}
