import React, { useState } from "react";
import Display from "./Display";

function Type() {
  const initialState = {
    text: "hello how are you",
    userInput: "",
    second: 60,
    started: false,
    finished: false,
  };
  const [gameState, setGameState] = useState(initialState);

  const onInputChange = (e) => {
    const value = e.target.value;
    onFinish(value);
    setGameState({
      ...gameState,
      userInput: value,
    });
  };

  const onFinish = (userInput) => {
<<<<<<< HEAD
    console.log(userInput, "userinput");
    if (userInput === gameState.text) {
      console.log("truee");
      setGameState({ ...gameState, finished: true });
      console.log(gameState.finished);
=======
    if (userInput === gameState.text) {
      setGameState({
        finished: true,
      });
>>>>>>> 4a7eb9669b9271c8e6fd4c115ad943206d3d18cf
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <Display
        text={gameState.text}
        userInput={gameState.userInput}
        second={gameState.second}
      />
=======
      <Display text={gameState.text} userInput={gameState.userInput} />
>>>>>>> 4a7eb9669b9271c8e6fd4c115ad943206d3d18cf
      <textarea
        value={gameState.userInput}
        onChange={onInputChange}
        placeholder="typing..."
        readOnly={gameState.finished}
      ></textarea>
    </div>
  );
}
export default Type;
