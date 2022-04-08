import { useState } from "react";

import classes from "./Game.module.css";
import Board from "..//board/Board";
import Keyboard from "../keyboard/Keyboard";
import Card from "../ui/Card";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import { BOARD_COLUMNS, BOARD_ROWS } from "../../util/constants";

const Game = (props) => {
  const [cursor, setCursor] = useState(0);
  const [boardValues, setBoardValues] = useState(
    new Array(BOARD_COLUMNS * BOARD_ROWS)
      .fill()
      .map(() => ({ value: "", status: "empty", animation: "idle" }))
  );
  const [guessNumber, setGuessNumber] = useState(0);
  const [didGuessCorrect, setDidGuessCorrect] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentRow = Math.floor(cursor / BOARD_COLUMNS);

  const cursorHandler = (key, setKeys) => {
    if (isGameOver) return;
    if (
      key === "BACKSPACE" &&
      (cursor % BOARD_COLUMNS !== 0 || currentRow !== guessNumber)
    ) {
      setBoardValues((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[cursor - 1] = {
          value: "",
          status: "empty",
          animation: "idle",
        };
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
        newBoard[cursor] = { value: key, status: "default", animation: "pop" };
        newBoard[cursor].animation = "pop";
        return newBoard;
      });
      setCursor((prevCursor) => {
        return prevCursor + 1;
      });
    }
  };

  const checkGuess = (guess, setKeys) => {
    fetch("http://localhost:8000/check-word", {
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

        if (isCorrect) setDidGuessCorrect(isCorrect);

        setBoardValues((prevBoard) => {
          const start_cursor = cursor - 5;
          const newBoard = prevBoard.map((tile, idx) => {
            if (start_cursor <= idx && idx < cursor) {
              const letterData = letters.at(idx - cursor);
              return {
                ...tile,
                status: letterData.status,
                animation: "flip-out",
              };
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

  const toggleModalHandler = () => {
    setModalOpen((prevState) => !prevState);
  };

  if (!isGameOver && (didGuessCorrect || guessNumber === BOARD_ROWS)) {
    setIsGameOver(true);
    setModalOpen(true);
  }

  const modalComponent = isGameOver && modalOpen && (
    <Overlay>
      <Modal
        message={
          didGuessCorrect
            ? "Spot on! You're right!"
            : `😢 Better luck next time! ${props.answer.join("")} was the word!`
        }
        toggleModal={toggleModalHandler}
      />
    </Overlay>
  );

  return (
    <Card className="game">
      <div
        className={`${classes["modal-container"]} ${
          modalOpen ? classes.visible : ""
        }`}
      >
        {modalComponent}
      </div>
      <Board rowsNum={6} boardValues={boardValues} />
      <Keyboard onCursor={cursorHandler} />
    </Card>
  );
};

export default Game;
