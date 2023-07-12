
0
import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  letterContainer: {
    overflow: 'auto',
    marginBottom: '10px'
  },
  letter: {
    float: 'left',
    padding: '10px 10px',
    background: '#c9e4ed',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
  },
}

function Tile({letter, setStr, str}) {

   function handleClick(e) {
    setStr(str.concat(e.target.innerHTML));
  }

  return (
    <button
    type='button'
    onClick = {(e)=>handleClick(e)}
    style={style.letter}
    >
    { letter }
    </button>
  );
}

function Application(props) {
  const [str, setStr] = useState('')

 
function replace3 (str) {
  let arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) {
      arr.splice(i, 3, '_');
    }
  }
  return  arr.join('');
}

let alphArr = []
for(let i =65; i<91; i++){
  alphArr.push([String.fromCharCode(i), i])
}

  return (
    <section>
      <aside style={style.letterContainer} id="letterContainer">
        {
          alphArr.map(el => 
            <Tile 
            letter={el[0]}
            key={el[1]}
            setStr={setStr}
            str={str}
             />
          )
        }  
      </aside>
      <div id="outputString">{
        str.length > 3 ?  replace3(str) : str
        }</div>
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);