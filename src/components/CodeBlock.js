"use client";

import Image from "next/image";
import React, { useRef } from "react";
import hljs from "highlight.js/lib/common";

export default function CodeBlock({ code }) {
	// highlight code
	const highlightedCode = hljs.highlightAuto(code).value;

	const codeRef = useRef(null);
	const copyIconRef = useRef(null);

	function copy(text) {
		navigator.clipboard.writeText(text)
			.catch((error) => {
				console.error("Failed to copy text: ", error);
			});
	}

	function handleCopy() {
		if (codeRef.current) {
			// copy code
			copy(codeRef.current.innerText);
		}

		if (copyIconRef.current) {
			// change copy icon to check mark
			copyIconRef.current.src = "/images/checkMark.svg";
		}
	}

	return (
		<div className="round red" style={{ backgroundColor: "#131313", color: "white", padding: "30px", position: "relative" }}>
			<button style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleCopy}>
				<Image ref={copyIconRef} src="/images/copy.svg" title="Copy" alt="Copy" width="25" height="25" />
			</button>
			<pre>
				<code ref={codeRef} style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{
					__html: highlightedCode
				}} />
			</pre>
		</div>
	);
}
