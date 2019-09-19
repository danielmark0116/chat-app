import * as React from 'react';
import { Fragment } from 'react';

import { MsgObject } from '../interfaces/MsgInterface';

import Message from './Message';

import * as style from '../styles/main.scss';

interface IProps {
  activeUser: string;
  messages: Array<MsgObject>;
}

export default function Messages(props: IProps) {
  return (
    <Fragment>
      <Message isPrimary={true}>Hello whtas up?</Message>
      <Message isPrimary={false}></Message>
      <br />
      <br />
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
