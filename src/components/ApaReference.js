import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

export default function ApaReference({ bibtex }) {
	// create citation
	const cite = new Cite(bibtex);

	const apaCitation = cite.format("bibliography", {
		format: "html",
		template: "apa",
	})
		// remove randomly generated id to prevent hydration errors
		.replace(/data-csl-entry-id="[^"]+"/g, "");

	// the apa citation never comes from user input so this is probably fine?
	return (
		<span
			style={{
				// hanging indent
				paddingLeft: "3em",
				textIndent: "-3em",
				// make sure words break if needed
				overflowWrap: "break-word"

			}}

			dangerouslySetInnerHTML={{ __html: apaCitation }}
		/>
	);
}