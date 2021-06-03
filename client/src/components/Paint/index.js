import React, { useState } from "react";

import { SketchField, Tools } from "react-sketch";

import ColorSelector from "react-color-selector";
import { Button, Select, Row, Col, Input } from "antd";

import { TrophyFilled } from "@ant-design/icons";
import { responsePathAsArray } from "graphql";
const { Option } = Select;

const picker_data = {
  col: 12,
  row: 12,
  width: 200,
  height: 200,
  view: "both",
  theme: "dark",
  title: "COLORS",
  cellControl: 4,
};

const Paint = () => {
  const [paintState, setPaintState] = useState({
    tools: Tools.Pencil,
    drawings: "",
    active: false,
    word: "orange",
    _sketch: "",
    lineWidth: 10,
  });

  const handleChange = (value) => {
    setPaintState({ tools: value });
  };

  const undo = () => {
    paintState._sketch.undo();
    setPaintState({
      canUndo: paintState._sketch.canUndo(),
      canRedo: paintState._sketch.canRedo(),
    });
  };

  const redo = () => {
    paintState._sketch.redo();
    setPaintState({
      canUndo: paintState._sketch.canUndo(),
      canRedo: paintState._sketch.canRedo(),
    });
  };

  const submitAnswerhandler = (e) => {};
  const chooseWord = async (e) => {
    e.preventDefault();
    fetch(
      "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
    )
      .then((response) => response.json())
      .then((data) => {
        setPaintState({ word: data[0].word });
      });
  };
  return (
    <>
      <Row>
        <Col
          span={15}
          offset={2}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={chooseWord} type="primary" primary>
            Choose a word
          </Button>
          <div
            style={{ fontSize: "40px", color: "#2980b9", fontWeight: "bold" }}
          >
            {paintState.word}
          </div>
          <div>
            <TrophyFilled
              style={{
                fontSize: "30px",
                display: "flex-end",
                color: "#d67400 ",
              }}
            />
            <span>Fasika</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={2}>
          <SketchField
            ref={(c) => (paintState._sketch = c)}
            backgroundColor="#fff"
            width="98%"
            height="70vh"
            tool={paintState.tools}
            // lineColor={paintState.lineColor}
            // color={paintState.color}
          />
        </Col>
        <Col span={5} style={{ backgroundColor: "#F7F8F8" }}>
          <p>{paintState.submitAnswer}</p>
          <Input
            placeholder="Write your answer"
            onPressEnter={submitAnswerhandler}
            style={{ bottom: "0", position: "absolute" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={17} offset={2}>
          <div
            style={{
              backgroundColoe: "#555",
              display: "flex",
            }}
          >
            <Select
              defaultValue={paintState.tools}
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value={Tools.Pan} key="pan">
                Pan
              </Option>
              <Option value={Tools.Circle} key="circle">
                Circle
              </Option>
              <Option value={Tools.Rectangle} key="rectangle">
                Rectangle
              </Option>
              <Option value={Tools.Line}>Line</Option>
              <Option value={Tools.Pencil}>Pencil</Option>
            </Select>
            <Button
              onClick={() =>
                setPaintState({ colorSelector: !paintState.colorSelector })
              }
            >
              Color
            </Button>

            {/* {paintState.colorSelector && (
              <ColorSelector
                pallet={picker_data}
                selectedColor={setPaintState}
              />
            )} */}
            <Button onClick={undo}>Undo</Button>
            <Button onClick={redo}>Redo</Button>
          </div>
          {/* <Slider
            defaultValue={paintState.lineWidth}
            tooltipVisible
            onChange={(e, value) => setPaintState({ lineWidth: value })}
          /> */}
        </Col>
        {/* <Col span={2}></Col> */}
      </Row>
    </>
  );
};

export default Paint;
