import classes from "./Tile.module.css";

const Tile = (props) => {
  const { value, status, animation } = props.tileData;
  const tileClasses = `${classes.tile} ${classes[status]}`;

  return (
    <div className={tileClasses} data-animation={animation}>
      {value}
    </div>
  );
};

export default Tile;
