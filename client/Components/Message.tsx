import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  isPrimary: boolean;
  children?: string;
  msgAuthor?: string;
  key?: number;
}

export default function Message(props: IProps) {
  const { isPrimary, children, msgAuthor } = props;

  return (
    <div
      className={isPrimary ? style.message_primary : style.message_secondary}
    >
      {children}
      <span>{msgAuthor}</span>
    </div>
  );
}

Message.defaultProps = {
  msgAuthor: 'Author',
  children: 'Message text here...',
  key: 1
};
