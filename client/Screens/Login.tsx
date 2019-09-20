import * as React from 'react';
import { useState } from 'react';

import Input from '../Components/Input';

import * as style from '../styles/main.scss';

interface IProps {
  enterChat: Function;
  nameTaken: boolean;
}

export default function Login(props: IProps) {
  const [error, updateError] = useState(false);

  const { enterChat, nameTaken } = props;

  return (
    <div className={` ${style.login_screen}`}>
      <p>Enter your nickname and join the chat!</p>
      <Input
        buttonText="join"
        placeholderText="Type in your nickname here"
        submitHandler={(inputValue: string, isEmpty: boolean) => {
          if (!isEmpty) {
            inputValue.length > 3 && enterChat(inputValue);
            updateError(false);
          } else {
            updateError(true);
          }
        }}
      />
      {error && (
        <p className={style.error}>
          Your nickanme must be at least 4 characters long
        </p>
      )}
      {nameTaken && (
        <p className={style.error}>
          Someone of such nickname is already in the chat. Pick another nickname
        </p>
      )}
    </div>
  );
}
