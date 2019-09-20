import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  username: string;
  active: boolean;
}

export default function UserItem(props: IProps) {
  const { username, active } = props;

  return (
    <div className={style.user_item}>
      <p className={active ? style.active : style.nonActive}>{username}</p>
    </div>
  );
}
