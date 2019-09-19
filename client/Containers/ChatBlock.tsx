import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  children?: React.ReactNode;
}

export default function ChatBlock(props: IProps) {
  return <div className={style.chat_block}>{props.children}</div>;
}
