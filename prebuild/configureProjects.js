import { existsSync, readdir, statSync } from "fs";
import cpx from "cpx2";

const projectFolder = "./projects/";

// get items in project folder
export default function configureProjects() {
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
				console.log("Configuring project " + item);

				// app folder
				if (existsSync(path + "/app")) {
					copyPath(path + "/app/**", "src/app/projects/" + item);
				}

				// api folder
				if (existsSync(path + "/api")) {

					copyPath(path + "/api/**", "src/pages/api/projects/" + item);
				}

				// public folder
				if (existsSync(path + "/public")) {

					copyPath(path + "/public/**", "public/projects/" + item);
				}
			}
		});
	});
}

function copyPath(source, destination) {
	if (process.env.NODE_ENV == "development") {
		console.log("Watching for folder changes in development");
		cpx.watch(source, destination);
	} else {
		cpx.copySync(source, destination);
	}
}