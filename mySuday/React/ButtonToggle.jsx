import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Toggle() {
const [btn,setBtn]=useState("ON")
  function handleClick() {
  if(btn=="ON")
  setBtn("OF")
  else
  setBtn("ON")
  }
  
  return (
    <button onClick={handleClick}>{btn}</button>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Toggle />);