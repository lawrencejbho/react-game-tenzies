import React, { useState } from "react";
import Die from "./components/Die.js";
import { nanoid } from "nanoid";

function App() {
  // store your dices in state, initial state will call allNewDice to creat them
  const [dices, setDices] = useState(allNewDice());

  // function to create a new array of 10 items with values from 1-6
  // not sure why but when I tried creating the object first instead of within the for loop I couldn't push a new dice and would repeat the first one
  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return array;
  }

  function holdDice(id) {
    console.log(id);
  }

  // render dice Elements here
  const diceElements = dices.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  // for our Roll button, it generates new dices for us and passes them into setDices
  function rollDice() {
    setDices(allNewDice());
  }

  return (
    <div className="App">
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>
          Roll
        </button>
      </main>
    </div>
  );
}

export default App;
