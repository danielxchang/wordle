import { Fragment, useEffect, useState } from "react";
import MainNavigation from "./components/layout/MainNavigation";

import Game from "./components/game/Game";

const App = () => {
  const [word, setWord] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/word")
      .then((response) => response.json())
      .then((data) => {
        if (!data) throw new Error("Failed fetching word!");
        setWord(data.word.split(""));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <MainNavigation title="Wordle" />
      <Game answer={word} />
    </Fragment>
  );
};

export default App;
