import * as React from 'react';
import { Fragment } from 'react';

import { MsgObject } from '../interfaces/MsgInterface';
import { UserObject } from '../interfaces/UserInterface';
import { SocketObject } from '../interfaces/SocketInterface';

import ChatBlock from '../Containers/ChatBlock';
import ActiveUsersBlock from '../Containers/ActiveUsersBlock';

import Navbar from '../Components/Navbar';
import UsersList from '../Components/UsersList';
import Messages from '../Components/Messages';
import NewMessage from '../Components/NewMessage';

import * as style from '../styles/main.scss';

interface IProps {
  activeUser: string;
  disconnectFromChannel: Function;
  socket: SocketObject;
  users: Array<UserObject>;
  messages: Array<MsgObject>;
}

export default function Chat(props: IProps) {
  return (
    <Fragment>
      <Navbar disconnectFromChannel={props.disconnectFromChannel} />
      <div className={style.chat_container}>
        <ActiveUsersBlock>
          <UsersList users={props.users} />
        </ActiveUsersBlock>
        <ChatBlock>
          <Messages activeUser={props.activeUser} messages={props.messages} />
          <NewMessage socket={props.socket}></NewMessage>
        </ChatBlock>
      </div>
    </Fragment>
  );
}
