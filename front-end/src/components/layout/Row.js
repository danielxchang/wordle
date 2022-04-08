import Tile from "../board/Tile";
import Button from "../keyboard/Button";

// Returns an array from 0 to N
const zeroToN = (n) => Array.from(Array(n).keys());

const Row = (props) => {
  const cells =
    props.type === "tiles"
      ? zeroToN(props.columnNum).map((tileId) => (
          <Tile
            key={"tile" + props.rowNum + tileId}
            tileData={props.boardData[props.rowNum * 5 + tileId]}
          />
        ))
      : zeroToN(props.columnNum).map((buttonId) => (
          <Button
            key={"button" + props.rowNum + buttonId}
            keyData={props.keysList[buttonId]}
            onKey={props.onKeyClick}
          />
        ));

  return <div className={props.className}>{cells}</div>;
};

export default Row;
