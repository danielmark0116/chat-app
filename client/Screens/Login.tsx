import * as React from 'react';
import { useState } from 'react';

import Input from '../Components/Input';

import * as style from '../styles/main.scss';

interface IProps {
  enterChat: Function;
}

export default function Login(props: IProps) {
  const [error, updateError] = useState(false);

  return (
    <div className={` ${style.login_screen}`}>
      <p>Enter your nickname and join the chat!</p>
      <Input
        buttonText="join"
        placeholderText="Type in your nickname here"
        submitHandler={(inputValue: string, isEmpty: boolean) => {
          !isEmpty
            ? inputValue.length > 3 && props.enterChat(inputValue)
            : updateError(true);
        }}
      />
      {error && (
        <p className={style.error}>
          Your nickanme must be at least 4 characters long
        </p>
      )}
    </div>
  );
}
