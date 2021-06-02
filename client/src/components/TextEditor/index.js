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
export default function TextEditor({ value, setValue, submitForm }) {
	function enterForm(event){
		if(event.code === "Enter" && !event.shiftKey){
			submitForm()
		}
	}
	return (
		<div className="text-editor">
			<ReactQuill
				modules={{ toolbar }}
				theme="snow"
				value={value}
				onKeyDown={(e)=>enterForm(e)}
				onChange={setValue}>
			</ReactQuill>
		</div>
	);
}
