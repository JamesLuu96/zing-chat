import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const toolbar = [
	[{ header: [1, 2, false] }],
	["bold", "italic", "underline", "strike"],
	[{ list: "ordered" }, { list: "bullet" }],
	["link", "image", "video"],
	["clean"],
];
export default function TextEditor({ value, setValue }) {
	return (
		<div className="text-editor">
			<ReactQuill
				modules={{ toolbar }}
				theme="snow"
				value={value}
				onChange={setValue}></ReactQuill>
		</div>
	);
}
