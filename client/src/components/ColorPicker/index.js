import React from "react";
import { BlockPicker } from "react-color";

class ColorPicker extends React.Component {
	state = {
		background: "#fff",
	};
	handleChange(color, event) {
		color = {
			hex: "#333",
			rgb: {
				r: 51,
				g: 51,
				b: 51,
				a: 1,
			},
			hsl: {
				h: 0,
				s: 0,
				l: 0.2,
				a: 1,
			},
		};
	}
	handleChangeComplete = (color, event) => {
		this.setState({ background: color.hex });
	};

	render() {
		return (
			<BlockPicker
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
