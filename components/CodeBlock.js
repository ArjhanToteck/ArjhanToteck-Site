"use client";

import React, { useRef } from "react";

export default function CodeBlock({ children }) {

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
        <div className="round" style={{ backgroundColor: "#131313", color: "white", padding: "40px", position: "relative" }}>
            <img src="/images/copy.svg" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleCopy}></img>
            <code ref={codeRef} style={{ whiteSpace: "pre-wrap" }}>
                {children}
            </code>
        </div>
    );
}
