import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes.button} ${classes[props.keyData.status]}`;

  return (
    <div className={btnClasses} onClick={props.onKey}>
      {props.keyData.key}
    </div>
  );
};

export default Button;
