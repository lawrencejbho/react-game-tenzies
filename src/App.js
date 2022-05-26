import React from "react";
import Die from "./components/Die.js";

function App() {
  // function to create a new array of 10 items with values from 1-6
  function allNewDice() {
    const array = [];

    for (let i = 0; i < 10; i++) {
      array.push(Math.ceil(Math.random() * 6));
    }
    return array;
  }

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
        </div>
      </main>
    </div>
  );
}

export default App;
