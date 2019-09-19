import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  children?: React.ReactNode;
}

export default function ActiveUsersBlock(props: IProps) {
  return <div className={style.active_users_block}>{props.children}</div>;
}
