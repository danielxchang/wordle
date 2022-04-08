import classes from "./Modal.module.css";
import CloseBtn from "./CloseBtn";

const Modal = (props) => {
  return (
    <div className={classes.content}>
      <h1 className={classes.message}>{props.message}</h1>
      <CloseBtn onToggle={props.toggleModal} />
    </div>
  );
};

export default Modal;
