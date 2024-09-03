"use client";

import React, { useRef } from "react";
import hljs from "highlight.js/lib/common";

export default function CodeBlock({ code }) {
	const highlightedCode = hljs.highlightAuto(code).value;

	const codeRef = useRef(null);

	function copy(text) {
		navigator.clipboard.writeText(text)
			.catch((error) => {
				console.error("Failed to copy text: ", error);
			});
	}

	function handleCopy() {
		if (codeRef.current) {
			copy(codeRef.current.innerText);
		}
	}

	return (
		<div className="round" style={{ backgroundColor: "#131313", color: "white", padding: "25px", position: "relative" }}>
			<img src="/images/copy.svg" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleCopy} title="Copy"></img>
			<pre>
				<code ref={codeRef} style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{
					__html: highlightedCode
				}} />
			</pre>
		</div>
	);
}
