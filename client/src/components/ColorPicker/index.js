import React, { useState } from "react";
import { BlockPicker } from "react-color";

export default function ColorPicker() {
  const [color, setColor] = useState("#333");
  const handleChange = (color) => {
    setColor(color.hex);
    console.log(color);
  };
  const onComplete = (color) => {
    setColor(color.hex);
    console.log(color);
  };

  return (
    <BlockPicker
      width="100"
      triangle="hide"
      value={color}
      onChange={handleChange}
      onChangeComplete={onComplete}
    />
  );
}
