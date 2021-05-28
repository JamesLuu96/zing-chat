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
    if (userInput === gameState.text) {
      setGameState({
        finished: true,
      });
    }
  };

  return (
    <div>
      <Display text={gameState.text} userInput={gameState.userInput} />
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
