import { readdir, statSync } from "fs";
const cpx = require("cpx2");

const projectFolder = "./projects/";

// get items in project folder
readdir(projectFolder, (err, items) => {
	if (err) {
		console.error("Error reading projects folder: ", err);
		return;
	}

	// loop through items
	items.forEach(item => {
		const path = projectFolder + item;

		// get item info
		let stats = statSync(path);

		// check if directory
		if (stats.isDirectory()) {
			// TODO: copy folders into their respective places
			// TODO: watch folders if dev, copy if build
		}
	});
});