"use client";

// TODO: replace all requires with imports for best practice
import projects from "./projects";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {

	return (
		<main>
			<section className="red">
				<h1 style={{ fontSize: "75px" }}>
					Welcome.
				</h1>
				<h2 style={{ textAlign: "center" }}>
					I'm Arjhan. I make stuff sometimes. Sometimes it's good, too.
					<br />
					You should look at some of it.
				</h2>

				<h2 style={{ marginBottom: "0px" }}>
					<hr />
					Server Statuses
				</h2>

				<p>This site uses various servers to run. Since I'm a broke teenager, they're all free services, so sometimes they may be asleep and take a bit to wake back up. Projects that use websockets, like the chat-based ones, may take an especially long time to load when asleep because of this.</p>

				<ul style={{ alignContent: "center", textAlign: "center", listStyleType: "none" }}>
					<li> Next.js Server: <ServerStatus currentServer={true} /> </li>
					<li> Processing Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_PROCESSING_SERVER} /> </li>
					<li> Socket.IO Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_SOCKETIO_SERVER} /> </li>
					<li> PocketBase Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_POCKETBASE_SERVER} /> </li>
				</ul>
				<br />
			</section>

			<div className="divider topDivider" />

			<section>
				<h1>Projects</h1>
				<br />
				<div id="projects" style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", margin: "auto", width: "85%" }}>
					{projects.map((project, index) => (
						<Project key={index} project={project} />
					))}
				</div>
			</section>
		</main>
	);
}

function Project({ project }) {
	const { name, path, thumbnailAlt, description, absolutePath } = project || {};

	let adjustedPath;

	// use absolute path if present
	if (absolutePath) {
		adjustedPath = absolutePath;
	} else {
		adjustedPath = "projects/" + path;
	}

	return (
		<div style={{ width: "300px" }}>
			<h2>
				{name}
			</h2>

			<a href={adjustedPath}>
				<Image width="300" height="170" src={`/projects/${path}/thumbnail.png`} alt={thumbnailAlt} />
			</a>
			<h5>{description}</h5>
		</div>
	)
}

function ServerStatus({ endpoint = null, currentServer = false }) {
	const [healthy, setHealthy] = useState(true);

	useEffect(() => {
		const checkServerStatus = async () => {
			if (!currentServer && endpoint) {
				const isHealthy = await checkEndpoint(endpoint);
				setHealthy(isHealthy);
			}
		};

		checkServerStatus();
	}, [endpoint, currentServer]);

	return (
		<strong className="textOutline" style={{ color: healthy ? "green" : "red" }}>{healthy ? "Healthy" : "Not Working"}</strong>
	);
}

async function checkEndpoint(endpoint) {
	try {
		const response = await fetch(endpoint + "/api/health");

		if (!response.ok) {
			return false;
		}

		const data = await response.json();
	} catch (error) {
		console.error("Error checking endpoint:", error);
		return false;
	}
}