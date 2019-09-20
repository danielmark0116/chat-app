import * as React from 'react';
import { Fragment, useState } from 'react';

import * as style from '../styles/main.scss';

interface IProps {
  placeholderText?: string;
  submitHandler: Function;
  buttonText?: string;
  fixedBottom?: boolean;
}

export default function Input(props: IProps) {
  const [inputValue, handleInputChange] = useState('');

  const { placeholderText, submitHandler, buttonText, fixedBottom } = props;

  return (
    <Fragment>
      <form
        className={fixedBottom ? style.fixed_bottom : null}
        onSubmit={e => {
          e.preventDefault();
          submitHandler(inputValue, true);
          handleInputChange('');
          if (inputValue.length > 0) {
            submitHandler(inputValue, false);
          }
        }}
      >
        <div className={style.input_group}>
          <div className={style.input}>
            <input
              type="text"
              value={inputValue}
              placeholder={placeholderText}
              onChange={e => handleInputChange(e.target.value)}
            />
          </div>
          <div className={style.button}>
            <button>{buttonText}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

Input.defaultProps = {
  placeholderText: 'Your placeholder here...',
  buttonText: 'submit',
  fixedBottom: false
};
