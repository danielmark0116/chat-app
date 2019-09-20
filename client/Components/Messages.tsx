import * as React from 'react';

import * as style from '../styles/main.scss';

import { MsgObject } from '../interfaces/MsgInterface';

import Message from './Message';

interface IProps {
  activeUser: string;
  messages: Array<MsgObject>;
}

export default class Messages extends React.Component<IProps, {}> {
  nodeRef = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    const node = this.nodeRef.current;

    node.scrollTop = node.scrollHeight - node.clientHeight;
  }

  render() {
    const { messages, activeUser } = this.props;

    return (
      <div className={style.messages_container} ref={this.nodeRef}>
        {messages.map((msg, index) => (
          <Message
            key={index}
            msgAuthor={msg.from === activeUser ? 'You' : msg.from}
            isPrimary={msg.from === activeUser ? true : false}
          >
            {msg.msg}
          </Message>
        ))}
      </div>
    );
  }
}
