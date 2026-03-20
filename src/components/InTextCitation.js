"use client";

// TODO: make it show citation on hover

export default function InTextCitation({ text, bibtexKey }) {

	// note that #bibtexKey is assumed to be the id of the reference

	return (
		<a href={"#" + bibtexKey}>
			{text}
		</a>
	);
}