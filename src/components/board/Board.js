import classes from "./Board.module.css";
import Row from "../layout/Row";
import Card from "../ui/Card";

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

  return (
    <Card className={classes.board_container}>
      <div className={classes.board}>{rows}</div>
    </Card>
  );
};

export default Board;
