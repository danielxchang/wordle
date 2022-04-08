import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.title}>{props.title}</div>
    </header>
  );
};

export default MainNavigation;
