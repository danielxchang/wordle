import classes from "./Overlay.module.css";

const Overlay = (props) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

export default Overlay;
