import React, { useState, Fragment } from 'react';

export default function Login(props) {
  const [inputValue, handleInput] = useState('');
  const [error, updateError] = useState(false);

  return (
    <Fragment>
      {error && <p>your alias must be at least 3 chars long</p>}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (inputValue.length > 2) {
            props.enterChat(inputValue);
            updateError(false);
          } else {
            updateError(true);
          }
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={e => {
            handleInput(e.target.value);
          }}
        />
        <button>Enter chat</button>
      </form>
    </Fragment>
  );
}
