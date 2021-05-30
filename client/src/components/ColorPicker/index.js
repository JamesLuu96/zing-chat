import React from "react";
import { BlockPicker } from "react-color";

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

class ColorPicker extends React.Component {
	state = {
		background: getRandomColor(),
	};
	handleChange(color, event) {
		color = "";
	}
	handleChangeComplete = (color, event) => {
		this.setState({ background: color });
	};

	render() {
		return (
			<BlockPicker
				width="90%"
				triangle="hide"
				colors={[
					"#D9E3F0",
					"#F47373",
					"#697689",
					"#37D67A",
					"#2CCCE4",
					"#555555",
					"#dce775",
					"#ff8a65",
					"#ba68c8",
					"#D9E3F0",
					"#F47373",
					"#697689",
					"#37D67A",
					"#2CCCE4",
					"#555555",
				]}
				color={this.state.background}
				onChange={this.handleChange}
				onChangeComplete={this.handleChangeComplete}
			/>
		);
	}
}

export default ColorPicker;
