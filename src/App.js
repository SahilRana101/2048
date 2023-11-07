import { useState } from "react";
import "./App.css";

function App() {
  const [game, setGame] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  function moveRight(arr) {
    let finalArray = [];
    for (let i = 0; i <= 4; i++) {
      if (arr[i] == [0, 0, 0, 0, 0]) {
        finalArray.push([0, 0, 0, 0, 0]);
        continue;
      }
      let stack = [];

      for (let j = 4; j >= 0; j--) {
        if (arr[i][j] === 0) continue;

        if (stack.length === 0) stack.push(arr[i][j]);
        else if (stack[stack.length - 1] === arr[i][j]) {
          stack.push(2 * stack.pop());
        } else {
          stack.push(arr[i][j]);
        }
      }
      let zeroes = [];
      for (let i = 0; i < 5 - stack.length; i++) {
        zeroes.push(0);
      }
      stack.reverse();
      finalArray.push([...zeroes, ...stack]);
    }
    return finalArray;
  }

  function moveLeft(arr) {
    let finalArray = [];

    for (let i = 0; i <= 4; i++) {
      if (arr[i] == [0, 0, 0, 0, 0]) {
        finalArray.push([0, 0, 0, 0, 0]);
        continue;
      }
      let stack = [];

      for (let j = 0; j <= 4; j++) {
        if (arr[i][j] === 0) continue;

        if (stack.length === 0) stack.push(arr[i][j]);
        else if (stack[stack.length - 1] === arr[i][j]) {
          stack.push(2 * stack.pop());
        } else {
          stack.push(arr[i][j]);
        }
      }
      let zeroes = [];
      for (let i = 0; i < 5 - stack.length; i++) {
        zeroes.push(0);
      }
      finalArray.push([...stack, ...zeroes]);
    }
    return finalArray;
  }

  function moveUp(arr) {
    let finalArray = [[], [], [], [], []];

    for (let i = 0; i <= 4; i++) {
      let arrToWorkWith = [];

      for (let j = 0; j <= 4; j++) {
        arrToWorkWith.push(arr[j][i]);
      }

      if (arrToWorkWith == [0, 0, 0, 0, 0]) {
        for (let j = 0; j <= 4; j++) {
          finalArray[j].push(0);
        }
        continue;
      }
      let stack = [];

      for (let j = 0; j <= 4; j++) {
        if (arrToWorkWith[j] === 0) continue;

        if (stack.length === 0) stack.push(arrToWorkWith[j]);
        else if (stack[stack.length - 1] === arrToWorkWith[j]) {
          stack.push(2 * stack.pop());
        } else {
          stack.push(arrToWorkWith[j]);
        }
      }
      let zeroes = [];
      for (let i = 0; i < 5 - stack.length; i++) {
        zeroes.push(0);
      }
      stack = [...stack, ...zeroes];

      for (let j = 0; j <= 4; j++) {
        finalArray[j].push(stack[j]);
      }
    }
    return finalArray;
  }

  function moveDown(arr) {
    let finalArray = [[], [], [], [], []];

    for (let i = 0; i <= 4; i++) {
      let arrToWorkWith = [];

      for (let j = 0; j <= 4; j++) {
        arrToWorkWith.push(arr[j][i]);
      }

      if (arrToWorkWith == [0, 0, 0, 0, 0]) {
        for (let j = 0; j <= 4; j++) {
          finalArray[j].push(0);
        }
        continue;
      }
      let stack = [];

      for (let j = 4; j >= 0; j--) {
        if (arrToWorkWith[j] === 0) continue;

        if (stack.length === 0) stack.push(arrToWorkWith[j]);
        else if (stack[stack.length - 1] === arrToWorkWith[j]) {
          stack.push(2 * stack.pop());
        } else {
          stack.push(arrToWorkWith[j]);
        }
      }
      let zeroes = [];
      for (let i = 0; i < 5 - stack.length; i++) {
        zeroes.push(0);
      }
      stack.reverse();
      stack = [...zeroes, ...stack];

      for (let j = 0; j <= 4; j++) {
        finalArray[j].push(stack[j]);
      }
    }
    return finalArray;
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      let finalArray = moveRight(game);

      let list = emptySpaces(finalArray);
      if (list.length === 0) {
        alert("You lost");
        resetGame();
      }
      setGame(putNumbersInEmptySpaces(list, finalArray));
    }

    if (event.key === "ArrowLeft") {
      let finalArray = moveLeft(game);

      let list = emptySpaces(finalArray);
      if (list.length === 0) {
        alert("You lost");
        resetGame();
      }
      setGame(putNumbersInEmptySpaces(list, finalArray));
    }

    if (event.key === "ArrowDown") {
      let finalArray = moveDown(game);

      let list = emptySpaces(finalArray);
      if (list.length === 0) {
        alert("You lost");
        resetGame();
      }
      setGame(putNumbersInEmptySpaces(list, finalArray));
    }

    if (event.key === "ArrowUp") {
      let finalArray = moveUp(game);

      let list = emptySpaces(finalArray);
      if (list.length === 0) {
        alert("You lost");
        resetGame();
      }
      setGame(putNumbersInEmptySpaces(list, finalArray));
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function putNumbersInEmptySpaces(list, arr) {
    let finalArray = [[], [], [], [], []];

    for (let i = 0; i <= 4; i++) {
      for (let j = 0; j <= 4; j++) {
        finalArray[i][j] = arr[i][j];
      }
    }
    let i = 2;
    // if (list.length <= 5) {
    //   i = 2;
    // } else if (list.length <= 20) {
    //   i = 1;
    // } else {
    //   i = 0;
    // }

    for (i; i <= 2; i++) {
      let index = getRandomIntInclusive(0, list.length - 1);
      let number = getRandomIntInclusive(1, 2) * 2;

      finalArray[list[index][0]][list[index][1]] = number;
      list.splice(index, 1);
    }
    return finalArray;
  }

  function emptySpaces(arr) {
    let list = [];

    for (let i = 0; i <= 4; i++) {
      for (let j = 0; j <= 4; j++) {
        if (arr[i][j] === 0) list.push([i, j]);
      }
    }
    return list;
  }

  function resetGame() {
    setGame([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  }

  function startPause() {
    if (!isPlaying) {
      setIsPlaying(true);
      let list = emptySpaces(game);
      setGame(putNumbersInEmptySpaces(list, game));
    }
  }

  return (
    <div className="App" onKeyDown={handleKeyDown}>
      <div className="container text-center p-5">
        <div className="row gap-1 justify-content-center">
          {game.map((numOut) => {
            return numOut.map((numIn, index) => {
              if (numIn === 0) {
                return (
                  <div className="col-2 p-0" key={index}>
                    <div className="box">
                      <h1 className="p-2 fade">0</h1>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="col-2 p-0">
                    <div className="box">
                      <h1 className="p-2">{numIn}</h1>
                    </div>
                  </div>
                );
              }
            });
          })}
          <button
            className="btn btn-outline-success w-25 js-btn"
            onClick={() => startPause()}
          >
            {isPlaying ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
