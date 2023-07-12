
///משחק איקס עיגול
import React, {useState}  from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({value, onClick}) {
  return (
    <div
      className="square"
      onClick={onClick}
      style={squareStyle}>{value}
    </div>
  );
}

function Board() {
  const [isXNext, setIsXNext] = useState(true);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  
  const calculateWinner = () => {
      const winnerConfiguration = [
         [0, 1, 2], 
         [3, 4, 5], 
         [6, 7, 8], 
         [0, 3, 6], 
         [1, 4, 5], 
         [2, 5, 8], 
         [0, 4, 8], 
         [2, 4, 6], 
      ];

      for(let i=0; i<winnerConfiguration.length; i++) {
        let [a, b, c] = winnerConfiguration[i];
        if (
          tiles[a] &&
          tiles[a] === tiles[b] && 
          tiles[b] === tiles[c]) { 
            return tiles[a];
          }
      } 
      return false;
  } 

  const winner = calculateWinner();
  const play = (index) => {
    if (tiles[index] || winner) return;

    const tilesCopy = [...tiles];
    tilesCopy[index] = isXNext ? 'X' : 'O';
    setTiles(() => tilesCopy);
    setIsXNext(() => !isXNext);
  }

  const reset = () => {
      setTiles(Array(9).fill(null));
      setIsXNext(true);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: { isXNext ? 'X' : '0' }</div>
      <div className="winner" style={instructionsStyle}>Winner: { winner || 'None' }</div>
      <button onClick={reset} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={tiles[0]} onClick={() => play(0)} />
          <Square value={tiles[1]} onClick={() => play(1)} />
          <Square value={tiles[2]} onClick={() => play(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={tiles[3]} onClick={() => play(3)} />
          <Square value={tiles[4]} onClick={() => play(4)} />
          <Square value={tiles[5]} onClick={() => play(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={tiles[6]} onClick={() => play(6)} />
          <Square value={tiles[7]} onClick={() => play(7)} />
          <Square value={tiles[8]} onClick={() => play(8)} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);