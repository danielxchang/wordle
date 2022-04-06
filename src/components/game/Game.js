import { useState } from "react";

import Board from "..//board/Board";
import Keyboard from "../keyboard/Keyboard";
import Card from "../ui/Card";
import { BOARD_COLUMNS, BOARD_ROWS } from "../../util/constants";

const Game = (props) => {
  const [cursor, setCursor] = useState(0);
  const [boardValues, setBoardValues] = useState(
    new Array(BOARD_COLUMNS * BOARD_ROWS)
  );
  const [guessNumber, setGuessNumber] = useState(0);

  const currentRow = Math.floor(cursor / BOARD_COLUMNS);

  const cursorHandler = (key) => {
    if (
      key === "BACKSPACE" &&
      (cursor % BOARD_COLUMNS !== 0 || currentRow !== guessNumber)
    ) {
      setBoardValues((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[cursor - 1] = "";
        return newBoard;
      });
      setCursor((prevCursor) => prevCursor - 1);
    } else if (
      key === "ENTER" &&
      cursor !== 0 &&
      cursor % BOARD_COLUMNS === 0 &&
      guessNumber === currentRow - 1
    ) {
      const guess = boardValues.slice(cursor - 5, cursor);
      setGuessNumber((prevGuess) => prevGuess + 1);
      // Trigger answer checking
      checkGuess(guess);
    } else if (
      key.length === 1 &&
      /[A-Z]/.test(key) &&
      currentRow === guessNumber
    ) {
      setBoardValues((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[cursor] = key;
        return newBoard;
      });
      setCursor((prevCursor) => {
        return prevCursor + 1;
      });
    }
  };

  const checkGuess = (guess) => {
    console.log(props.answer);
    console.log(guess);
    // Implement this portion NEXT
  };

  return (
    <Card className="game">
      <Board rowsNum={6} boardValues={boardValues} />
      <Keyboard onCursor={cursorHandler} />
    </Card>
  );
};

export default Game;
