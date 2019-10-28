import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {

    /*
    Get the squares as they currently stand
    Instead of directly changing the squares key
    in the this.state, we create a new variable,
    then assign this variable as the result. Better
    practice, for some reason I'm not aware of.
    */

    const squares = this.state.squares.slice();

    /*
    If the current squares are in a winning position
    return from thsi funciton This prevents the state being changed
    And therefore the DOM is not updatred
    */

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Change the value within the square that was clicked
    squares[i] = this.state.xIsNext ? 'X' : '0';

    /*
    Set the state
    update the squares
    Change which comes next, 0 or X
    */

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
    );
  }
  
  render() {
    
    // Find out if there is a winner
    const winner = calculateWinner(this.state.squares);

    // Get status to be displayed above board
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    }
    
    // Return the board
    return (
      <div>
        <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
class Game extends React.Component {
  render() {
    return (
       <div className="game">
        <div className="game-board">
          <Board />
        </div>
         <div className="game-info">
           <div>{/* status */}</div>
           <ol>{/* TODO */}</ol>
         </div>
       </div>
     );
   }
}
  
// ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}
  