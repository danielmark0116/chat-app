import * as React from 'react';

import { SocketObject } from '../interfaces/SocketInterface';

import Input from './Input';

interface IProps {
  socket: SocketObject;
}

export default function NewMessage(props: IProps) {
  const { socket } = props;

  return (
    <Input
      placeholderText="Your message here"
      buttonText="send"
      fixedBottom={true}
      submitHandler={(msg: string, isEmpty: boolean) => {
        !isEmpty ? socket.emit('message', msg) : null;
      }}
    />
  );
}
