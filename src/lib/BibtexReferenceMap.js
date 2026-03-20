import { readFileSync } from "fs";

export default class BibtexReferenceMap {
	constructor(referenceMap, bibtex) {
		this.referenceMap = referenceMap;
		this.bibtex = bibtex;
	}

	static loadReferencesFromFilePath(path) {
		// read from file
		try {
			const data = readFileSync(path, "utf8");
			// load references from raw text
			return BibtexReferenceMap.loadReferencesFromBibtex(data);
		} catch (err) {
			console.error("Reading bibtex file", path, "resulted in error:", err);
		}
	}

	static loadReferencesFromBibtex(bibtex) {
		const map = {};

		// split into entries
		bibtex.split(/(?=@)/).forEach(entry => {

			// remove whitespace for entry
			const trimmedEntry = entry.trim();

			// skip empty strings
			if (!trimmedEntry) {
				return;
			}

			// get key
			const match = trimmedEntry.match(/^@\w+\{([^,]+),/);

			// check if there"s an actual key
			if (match) {
				const key = match[1];

				// store plain text entry in map
				map[key] = trimmedEntry;
			}
		});


		return new BibtexReferenceMap(map, bibtex);
	}
}