import * as React from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  disconnectFromChannel: Function;
}

export default function Navbar(props: IProps) {
  return (
    <div className={style.nav}>
      <div>
        <h1>CHATapp</h1>
      </div>
      <div>
        <button
          className={`${style.btn} ${style.btn_primary}`}
          onClick={() => props.disconnectFromChannel()}
        >
          Leave chat
        </button>
      </div>
    </div>
  );
}
