import classes from "./Button.module.css";

const Button = (props) => {
  const onClickHandler = () => {
    console.log(props.value);

    // TODO - Update this logic to reflect clicked letters to the game board
  };

  return (
    <div className={classes.button} onClick={onClickHandler}>
      {props.value}
    </div>
  );
};

export default Button;
