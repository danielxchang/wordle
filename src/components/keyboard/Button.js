import classes from "./Button.module.css";

const Button = (props) => {
  return <div className={classes.button}>{props.value}</div>;
};

export default Button;
