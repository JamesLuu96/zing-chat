import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export default function Tags() {
	const [tags, setTags] = React.useState([]);
	return (
		<ReactTagInput
			tags={tags}
			placeholder="Type and press enter"
			editable={true}
			removeOnBackspace={true}
			onChange={(newTags) => setTags(newTags)}
		/>
	);
}
