import { Fragment } from "react";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import MainNavigation from "./components/layout/MainNavigation";
import Card from "./components/ui/Card";

function App() {
  return (
    <Fragment>
      <MainNavigation title="Wordle" />
      <Card className="game">
        <Board rowsNum={6} />
        <Keyboard />
      </Card>
    </Fragment>
  );
}

export default App;
