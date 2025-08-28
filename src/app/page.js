"use client";

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
				<div id="projects" style={{
					display: "inline-flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "10px",
					margin: "auto",
					width: "85%"
				}}>
					{projects.map((project, index) => (
						<Project key={index} project={project} />
					))}
				</div>
			</section>
		</main>
	);
}

function Project({ project }) {
	const { name, path, globalThumbnail, thumbnailAlt, description, absolutePath } = project || {};

	let adjustedPath;

	// use absolute path if present
	if (absolutePath) {
		adjustedPath = absolutePath;
	} else {
		adjustedPath = "projects/" + path;
	}

	// by default thumbnails are at the project paths
	let thumbnailPath = `/projects/${path}/thumbnail.png`;

	// if a global thumbnail is specified, it's stored in a global thumbnail folder instead
	// this is meant for external projects like GitHub repos or Itch publications that won't have their own submodule
	if (globalThumbnail) {
		thumbnailPath = `/thumbnails/${globalThumbnail}.png`
	}

	return (
		<div style={{ width: "300px" }}>
			<h2>
				{name}
			</h2>

			<a href={adjustedPath}>
				<Image width="300" height="170" src={thumbnailPath} alt={thumbnailAlt} />
			</a>
			<h5>{description}</h5>
		</div>
	)
}

function ServerStatus({ endpoint = null, currentServer = false }) {
	// if we know it's the current server we can just default 
	const [healthMessage, setHealthMessage] = useState("Loading...");
	const [healthColor, setHealthColor] = useState("yellow");

	useEffect(() => {
		// if it's the current server we know it's working
		if (currentServer) {
			setHealthMessage("Healthy");
			setHealthColor("green");
		} else if (endpoint) {
			checkServerStatus(endpoint);
		}
	}, [endpoint, currentServer]);

	return (
		<strong className="textOutline" style={{ color: healthColor }}>{healthMessage}</strong>
	);

	async function checkServerStatus(endpoint) {
		try {
			const response = await fetch(endpoint + "/api/health");

			if (!response.ok) {
				throw new Error(response.status);
			}

			const data = await response.json();

			// TODO: probably don't wanna use a magic string, but that's what works with pocketbase
			if (data.message == "API is healthy." || data.healthy) {
				setHealthMessage("Healthy");
				setHealthColor("green");
			} else {
				setHealthMessage("Waking up...");
				setHealthColor("yellow");
			}
		} catch (error) {
			console.error("Error checking endpoint:", error);

			setHealthMessage("Not working");
			setHealthColor("red");

			return false;
		}
	}
}