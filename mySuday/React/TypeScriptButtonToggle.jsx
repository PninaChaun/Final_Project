import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Toggle() {
  const [on, setOn]=useState<boolean>(true);
  function handleClick() {
    // todo
    setOn(!on);
  }
  
  return (
    <button onClick={handleClick}>{on? 'ON':'OFF'}</button>
  );
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);