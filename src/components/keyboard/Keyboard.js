import { useState, useEffect, useCallback } from "react";

import Row from "../layout/Row";
import Card from "../ui/Card";
import classes from "./Keyboard.module.css";
import { keyboardValues } from "../../util/constants";

const Keyboard = (props) => {
  const [rowKeys, setRowKeys] = useState(
    keyboardValues.map((keysRow) =>
      keysRow.map((key) => {
        return { key, status: "default" };
      })
    )
  );

  const keyClickHandler = (event) => {
    const key = event.target.innerHTML;
    props.onCursor(key);
    // setRowKeys((prevKeys) =>
    //   prevKeys.map((row) =>
    //     row.map((keyDict) => {
    //       if (keyDict.key === key) {
    //         keyDict.status = "absent";
    //       }
    //       return keyDict;
    //     })
    //   )
    // );
  };

  const keyDownHandler = useCallback(
    (event) => {
      const { key } = event;
      props.onCursor(key.toUpperCase());
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const rows = rowKeys.map((keysList, i) => (
    <Row
      key={"row" + i}
      rowNum={i}
      columnNum={keysList.length}
      keysList={keysList}
      className={classes.keyboard_row}
      type="buttons"
      onKeyClick={keyClickHandler}
    />
  ));

  return (
    <Card className={classes.keyboard_container}>
      <div className={classes.keyboard}>{rows}</div>
    </Card>
  );
};

export default Keyboard;
