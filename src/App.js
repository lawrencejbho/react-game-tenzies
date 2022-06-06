import React, { useState, useEffect } from "react";
import Die from "./components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // store your dices in state, initial state will call allNewDice to creat them
  const [dices, setDices] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  // this helps with keeping up with two things that have state and we can monitor our dices on each change
  // every method is nice to check that each item in the array has isHeld
  // we use the firstValue of the first item in the array to help us check that value versus every item in the array
  useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value == firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    } else {
      console.log("state changed");
    }
  }, [dices]);

  // use this function anytime we need a new Dice
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // function to create a new array of 10 items with values from 1-6 for the start of the game
  // not sure why but when I tried creating the object first instead of within the for loop I couldn't push a new dice and would repeat the first one
  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDice());
    }
    return array;
  }

  // if the id matches, we flip isHeld
  function holdDice(id) {
    setDices((prevDice) =>
      prevDice.map((dice) => {
        return id === dice.id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  // Roll button - we check the isHeld is true and generate a new dice if it's false
  // check if tenzies is true, if it is then run allNewDice otherwise check for held dice
  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);
    } else {
      setDices((prevDice) =>
        prevDice.map((dice) => (dice.isHeld ? dice : generateNewDice()))
      );
    }
  }

  // render dice Elements here
  const diceElements = dices.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      // we pass the dice.id parameter directly into it so needs to be written with this syntax
      holdDice={() => holdDice(dice.id)}
    />
  ));

  const bottomButton = tenzies ? "New Game" : "Roll";

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>
          {bottomButton}
        </button>
      </main>
    </div>
  );
}

export default App;
