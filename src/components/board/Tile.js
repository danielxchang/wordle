import classes from "./Tile.module.css";

const Tile = (props) => {
  return <div className={classes.tile}>{props.tileValue}</div>;
};

export default Tile;
