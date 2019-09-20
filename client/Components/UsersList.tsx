import * as React from 'react';
import { Fragment } from 'react';

import UserItem from './UserItem';

import * as style from '../styles/main.scss';

import { UserObject } from '../interfaces/UserInterface';

interface IProps {
  users: Array<UserObject>;
}

export default function UsersList(props: IProps) {
  const { users } = props;

  return (
    <Fragment>
      <div className={style.active_users_block_title}>
        <h2>
          {props.users.length} active{' '}
          {props.users.length === 1 ? 'user' : 'users'}
        </h2>
      </div>
      <div className={style.active_users_block_users}>
        {users.map((user, index) => (
          <UserItem active={true} key={index} username={user.name} />
        ))}
      </div>
    </Fragment>
  );
}
