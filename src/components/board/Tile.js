import classes from "./Tile.module.css";

const Tile = (props) => {
  const { value, status } = props.tileData;
  const tileClasses = `${classes.tile} ${classes[status]}`;

  return <div className={tileClasses}>{value}</div>;
};

export default Tile;
