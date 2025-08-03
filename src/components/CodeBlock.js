"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import hljs from "highlight.js/lib/common";

// TODO: set language
export default function CodeBlock({ code, showCopyButton = true, showDownloadButton = false, fileName = "code.txt", maxCodeHeight = "none", language }) {
	const [highlightedCode, setHighlightedCode] = useState("");

	const codeRef = useRef(null);
	const copyIconRef = useRef(null);
	const downloadIconRef = useRef(null);

	// highlight code
	useEffect(() => {
		if (language) {
			// set language
			setHighlightedCode(hljs.highlight(code, { language }).value);
		} else {
			// auto detect language
			setHighlightedCode(hljs.highlightAuto(code).value);
		}
	}, [code, language]);

	return (
		<div className="round red" style={{ textAlign: "left", backgroundColor: "#131313", color: "white", padding: "30px", position: "relative" }}>

			<div style={{
				position: "absolute",
				top: "10px",
				right: "10px",
				display: "flex",
				flexDirection: "row-reverse",
				gap: "5px"
			}}>
				<button style={{ display: showCopyButton ? "block" : "none" }} onClick={handleCopy}>
					<Image ref={copyIconRef} src="/images/copy.svg" title="Copy" alt="Copy" width="25" height="25" />
				</button>

				<button style={{ display: showDownloadButton ? "block" : "none" }} onClick={handleDownload}>
					<Image ref={downloadIconRef} src="/images/download.svg" title="Copy" alt="Copy" width="25" height="25" />
				</button>
			</div>


			<pre style={{ overflowY: "auto", maxHeight: maxCodeHeight }}>
				<code className="language-gcode" ref={codeRef} style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{
					__html: highlightedCode
				}} />
			</pre>
		</div>
	);


	function handleCopy() {
		if (codeRef.current) {
			// copy code
			navigator.clipboard.writeText(codeRef.current.innerText)
				.catch((error) => {
					console.error("Failed to copy text: ", error);
				});
		}

		buttonCheckMark(copyIconRef, "/images/copy.svg");
	}


	function handleDownload() {
		if (codeRef.current) {
			// download code

			// create blob url for code
			const blob = new Blob([codeRef.current.innerText], { type: "text/plain" });
			const url = URL.createObjectURL(blob);

			// create link with file name
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;

			// simulate click to download
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			// clean up url object
			URL.revokeObjectURL(url);
		}

		buttonCheckMark(downloadIconRef, "/images/download.svg");
	}

	function buttonCheckMark(iconRef, originalSrc, cooldown = 1000) {
		if (iconRef.current) {

			// change button icon to check mark
			iconRef.current.src = "/images/checkMark.svg";

			// reset old cooldown
			if (iconRef.current.cooldown) {
				clearTimeout(iconRef.current.cooldown);
			}

			// wait for cooldown
			iconRef.current.cooldown = setTimeout(() => {
				console.log("asd");
				// revert src
				if (iconRef.current) {
					iconRef.current.src = originalSrc;
				}
			}, cooldown);
		}
	}
}
