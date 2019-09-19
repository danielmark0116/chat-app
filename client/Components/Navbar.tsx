import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  disconnectFromChannel: Function;
}

export default function Navbar(props: IProps) {
  return (
    <div className={style.nav}>
      <button onClick={() => props.disconnectFromChannel()}>Leave chat</button>
    </div>
  );
}
