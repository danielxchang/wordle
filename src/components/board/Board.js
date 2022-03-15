import { useEffect } from "react";

import classes from "./Board.module.css";
import Row from "../layout/Row";
import Card from "../ui/Card";
import { cleanup } from "@testing-library/react";

const Board = (props) => {
  const rows = Array.from(Array(props.rowsNum).keys()).map((rowId) => (
    <Row
      key={"row" + rowId}
      rowNum={rowId}
      columnNum={5}
      className={classes.board_row}
      type="tiles"
    />
  ));

  useEffect(() => {
    const onKeyDownHandler = (event) => {
      const { key } = event;
      if (
        (key.length === 1 && /[a-z]/.test(key)) ||
        key === "Enter" ||
        key === "Backspace"
      )
        console.log(key);
    };

    document.addEventListener("keydown", onKeyDownHandler);

    // return () => {
    //   document.removeEventListener("keydown", onKeyDownHandler);
    // };
  }, []);

  return (
    <Card className={classes.board_container}>
      <div className={classes.board}>{rows}</div>
    </Card>
  );
};

export default Board;
