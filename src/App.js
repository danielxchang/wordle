import { Fragment } from "react";
import MainNavigation from "./components/layout/MainNavigation";

import Game from "./components/game/Game";

function App() {
  const word = "SPANK".split("");
  return (
    <Fragment>
      <MainNavigation title="Wordle" />
      <Game answer={word} />
    </Fragment>
  );
}

export default App;
