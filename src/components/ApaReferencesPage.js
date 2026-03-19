export default function ApaReferencesPage({
	type,
	title = "[No title]",
	authors = [],
	year = "n.d.",
	journal,
	volume,
	issue,
	pages,
	publisher,
	url
}) {
	// create csl object
	const cslData = {
		type,
		title,
		author: authors,
		issued: { "date-parts": [[year]] },
		journal,
		volume,
		issue,
		page: pages,
		publisher,
		url
	};

	// create citation
	const cite = new Cite(cslData);

	const apaCitation = cite.format("bibliography", {
		format: "text",
		template: "apa",
	});

	return <span
		style={{
			// hanging indent and double spacing
			paddingLeft: "1.5em",
			textIndent: "-1.5em",
			marginBottom: "0.5em",
		}}
	>
		{apaCitation}
	</span>;
}