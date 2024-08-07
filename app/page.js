"use client";

const Projects = require("./Projects");

import React, { useEffect, useState } from 'react';

export default function Index() {

	return (
		<main>
			<section className="red">
				<br></br>
				<h1 style={{ fontSize: "75px" }}>
					Welcome.
				</h1>
				<h2 style={{ textAlign: 'center' }}>
					I'm Arjhan. I make stuff sometimes. Sometimes it's good, too.
					<br></br>
					You should look at some of it.
				</h2>

				<h2 style={{ marginBottom: "0px" }}>
					<hr></hr>
					Server Statuses
				</h2>

				<p>This site uses various servers to run. They're all free services because I'm broke, so sometimes they may be asleep and take a bit to wake back up.</p>

				<ul style={{ alignContent: "center", textAlign: "center", listStyleType: "none" }}>
					<li> Next.js Server: <ServerStatus currentServer={true} /> </li>
					<li> Processing Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_PROCESSING_SERVER} /></li>
					<li> Socket.IO Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_SOCKETIO_SERVER} /></li>
					<li> PocketBase Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_POCKETBASE_SERVER} /> </li>
				</ul>
				<br></br>
			</section>

			<div className="divider topDivider"></div>

			<section>
				<h1>Projects</h1>
				<br></br>
				<div id="projects" style={{ display: "inline-flex", flexWrap: "wrap", margin: "auto", width: "85%" }}>
					{Projects.map((project, index) => (
						<Project key={index} project={project} />
					))}
				</div>
			</section>
		</main>
	);
}

function Project({ project }) {
	const { name, path, thumbnailAlt, description } = project || {};

	return (
		<div style={{ width: "300px" }}>
			<h2>
				{name}
			</h2>

			<a href={"projects/" + path}>
				<img width="300" src={`projects/${path}/thumbnail.png`} alt={thumbnailAlt} />
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
		return response.ok;
	} catch (error) {
		console.error("Error checking endpoint:", error);
		return false;
	}
}