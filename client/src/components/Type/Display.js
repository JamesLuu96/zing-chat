import React from "react";

function Preview({ second, text, userInput }) {
  const textArray = text.split("");

  return (
    <div>
      <div>timer {second}</div>

      {textArray.map((character, index) => {
        let color;
        if (index < userInput.length) {
          color = character === userInput[index] ? "#c2ff4b" : "#ee4c08";
        }
        return (
          <span key={index} style={{ backgroundColor: color }}>
            {character}
          </span>
        );
      })}
    </div>
  );
}

export default Preview;
