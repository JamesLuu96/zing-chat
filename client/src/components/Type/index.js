import React, { useState, useEffect } from "react";
import Display from "./Display";

function Type() {
  const initialState = {
    text: "hello",
    userInput: "",
    second: 60,
    started: false,
  };
  const [gameState, setGameState] = useState(initialState);
  const [finished, setFinished] = useState(false);
  const onInputChange = (e) => {
    const value = e.target.value;
    onFinish(value);
    setGameState({
      ...gameState,
      userInput: value,
    });
  };

  const onFinish = (userInput) => {
    console.log(userInput, "userinput");

    if (userInput === gameState.text) {
      setFinished({ finished: true });
    }
  };
  console.log(finished);
  useEffect(() => {
    fetch("http://api.quotable.io/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGameState({ ...gameState, text: data.content });
      });
    console.log(gameState.text);
  }, []);

  return (
    <div>
      <Display
        text={gameState.text}
        userInput={gameState.userInput}
        second={gameState.second}
      />
      <textarea
        value={gameState.userInput}
        onChange={onInputChange}
        placeholder="typing..."
        readOnly={finished}
      ></textarea>
      {/* <button onClick={tick}>start</button> */}
    </div>
  );
}
export default Type;
