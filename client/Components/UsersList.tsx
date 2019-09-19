import * as React from 'react';

import { UserObject } from '../interfaces/UserInterface';

import * as style from '../styles/main.scss';

interface IProps {
  users: Array<UserObject>;
}

export default function UsersList(props: IProps) {
  return (
    <div>
      <p>{props.users.length} online people</p>
    </div>
  );
}
