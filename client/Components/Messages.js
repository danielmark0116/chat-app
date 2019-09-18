import React, { Fragment, useEffect } from 'react';

import style from '../styles/main.scss';

export default function Messages(props) {
  useEffect(() => {
    // console.log(props.messages);
  });

  return (
    <Fragment>
      <div className={style.MessageList}>
        {props.messages.map((msg, i) => (
          <div
            key={i}
            className={`${style.MessageBlob} ${
              props.activeUser === msg.from ? style.Sent : null
            }`}
          >
            <span>{msg.msg}</span>
            <div className={style.Sender}>
              Sent by: <strong>{msg.from}</strong>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
