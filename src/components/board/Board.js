import classes from "./Board.module.css";
import Row from "../layout/Row";
import Card from "../ui/Card";
import { BOARD_COLUMNS } from "../../util/constants";

const Board = (props) => {
  const rows = Array.from(Array(props.rowsNum).keys()).map((rowId) => (
    <Row
      key={"row" + rowId}
      rowNum={rowId}
      columnNum={BOARD_COLUMNS}
      className={classes.board_row}
      type="tiles"
      boardValues={props.boardValues}
    />
  ));

  return (
    <Card className={classes.board_container}>
      <div className={classes.board}>{rows}</div>
    </Card>
  );
};

export default Board;
