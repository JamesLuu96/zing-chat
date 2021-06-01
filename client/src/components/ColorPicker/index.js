import React, { useState } from "react";
import { BlockPicker } from "react-color";

export default function ColorPicker({ currentColor }) {
  const [color, setColor] = useState("#333");

  const handleChange = (color) => {
    setColor(color.hex);
  };
  const onComplete = (color) => {
    setColor(color.hex);
  };
  console.log(color, "color");
  return (
    <BlockPicker
      width="100"
      triangle="hide"
      color={color}
      onChange={handleChange}
      onChangeComplete={onComplete}
    />
  );
}
