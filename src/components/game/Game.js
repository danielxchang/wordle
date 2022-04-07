import { useState } from "react";

import Board from "..//board/Board";
import Keyboard from "../keyboard/Keyboard";
import Card from "../ui/Card";
import { BOARD_COLUMNS, BOARD_ROWS } from "../../util/constants";

const Game = (props) => {
  const [cursor, setCursor] = useState(0);
  const [boardValues, setBoardValues] = useState(
    new Array(BOARD_COLUMNS * BOARD_ROWS)
      .fill()
      .map(() => ({ value: "", status: "default" }))
  );
  const [guessNumber, setGuessNumber] = useState(0);

  const currentRow = Math.floor(cursor / BOARD_COLUMNS);

  const cursorHandler = (key, setKeys) => {
    if (
      key === "BACKSPACE" &&
      (cursor % BOARD_COLUMNS !== 0 || currentRow !== guessNumber)
    ) {
      setBoardValues((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[cursor - 1].value = "";
        return newBoard;
      });
      setCursor((prevCursor) => prevCursor - 1);
    } else if (
      key === "ENTER" &&
      cursor !== 0 &&
      cursor % BOARD_COLUMNS === 0 &&
      guessNumber === currentRow - 1
    ) {
      const guess = boardValues
        .slice(cursor - 5, cursor)
        .map((letterObj) => letterObj.value);
      setGuessNumber((prevGuess) => prevGuess + 1);
      // Trigger answer checking
      checkGuess(guess, setKeys);
    } else if (
      key.length === 1 &&
      /[A-Z]/.test(key) &&
      currentRow === guessNumber
    ) {
      setBoardValues((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[cursor].value = key;
        return newBoard;
      });
      setCursor((prevCursor) => {
        return prevCursor + 1;
      });
    }
  };

  const checkGuess = (guess, setKeys) => {
    fetch("http://localhost:8000/word", {
      method: "POST",
      body: JSON.stringify({ guess, answer: props.answer }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { isCorrect, letters, validGuess } = data;

        if (!validGuess) return;

        setBoardValues((prevBoard) => {
          const start_cursor = cursor - 5;
          const newBoard = prevBoard.map((tile, idx) => {
            if (start_cursor <= idx && idx < cursor) {
              const letterData = letters.at(idx - cursor);
              return { ...tile, status: letterData.status };
            }
            return tile;
          });
          return newBoard;
        });

        setKeys((prevKeys) => {
          const newKeys = prevKeys.map((keysRow) =>
            keysRow.map((key) => {
              const guessLetterIdx = guess.findIndex(
                (letter) => letter === key.key
              );
              if (guessLetterIdx >= 0) {
                return { ...key, status: letters[guessLetterIdx].status };
              }
              return key;
            })
          );
          return newKeys;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card className="game">
      <Board rowsNum={6} boardValues={boardValues} />
      <Keyboard onCursor={cursorHandler} />
    </Card>
  );
};

export default Game;
