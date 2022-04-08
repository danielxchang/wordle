import classes from "./Button.module.css";

const Button = (props) => {
  const status = props.keyData.status;
  const btnClasses = `${classes.button} ${classes[status]}`;

  return (
    <div className={btnClasses} onClick={props.onKey}>
      {props.keyData.key}
    </div>
  );
};

export default Button;
