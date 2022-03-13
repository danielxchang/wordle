import Row from "../layout/Row";
import classes from "./Keyboard.module.css";

const rowKeys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "←"],
];

const Keyboard = (props) => {
  const rows = rowKeys.map((keysList, i) => (
    <Row
      key={"row" + i}
      rowNum={i}
      columnNum={keysList.length}
      values={keysList}
      className={classes.keyboard_row}
      type="buttons"
    />
  ));

  return <div className={classes.keyboard}>{rows}</div>;
};

export default Keyboard;
