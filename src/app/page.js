"use client";

import projects from "./projects";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function Page() {
	const projectsRef = useRef(null);

	useEffect(() => {
		if (!projectsRef.current) return;

		function alignTitles() {
			const container = projectsRef.current;
			const titles = container.querySelectorAll(".projectTitle");
			if (!titles || titles.length === 0) return;

			// reset first so we measure natural heights
			titles.forEach((t) => (t.style.minHeight = "0px"));

			// compute max height
			let max = 0;
			titles.forEach((t) => {
				const h = t.offsetHeight;
				if (h > max) max = h;
			});

			// apply max as minHeight to all titles
			titles.forEach((t) => (t.style.minHeight = `${max}px`));
		}

		// initial alignment
		alignTitles();

		// rerun on window resize
		window.addEventListener("resize", alignTitles);

		return () => {
			window.removeEventListener("resize", alignTitles);
		};
	}, [projectsRef, projects]);

	return (
		<main>
			<section className="red">
				<h1 style={{ fontSize: "75px" }}>Welcome.</h1>
				<h2 style={{ textAlign: "center" }}>
					I'm Arjhan. I make stuff sometimes. Sometimes it's good, too.
					<br />
					You should look at some of it.
				</h2>

				<h2 style={{ marginBottom: "0px" }}>
					<hr />
					Server Statuses
				</h2>

				<p>
					This site uses various servers to run. Since I'm a broke teenager, they're all free services,
					so sometimes they may be asleep and take a bit to wake back up. Projects that use websockets,
					like the chat-based ones, may take an especially long time to load when asleep because of this.
				</p>

				<ul style={{ alignContent: "center", textAlign: "center", listStyleType: "none" }}>
					<li>
						Next.js Server: <ServerStatus currentServer={true} />
					</li>
					<li>Processing Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_PROCESSING_SERVER} /></li>
					<li>Socket.IO Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_SOCKETIO_SERVER} /></li>
					<li>PocketBase Server: <ServerStatus endpoint={process.env.NEXT_PUBLIC_POCKETBASE_SERVER} /></li>
				</ul>
				<br />
			</section>

			<div className="divider topDivider" />

			<section>
				<h1>Projects</h1>
				<br />
				<div
					id="projects"
					ref={projectsRef}
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "10px",
						rowGap: "15px",
						margin: "auto",
						width: "85%"
					}}
				>
					{projects.map((project, index) => (
						<Project key={index} project={project} />
					))}
				</div>
				<br />
				<br />
			</section>
		</main>
	);
}

function Project({ project }) {
	const { name, path, globalThumbnail, thumbnailAlt, description, absolutePath } = project || {};

	const adjustedPath = absolutePath ? absolutePath : "projects/" + path;
	const thumbnailPath = globalThumbnail ? `/thumbnails/${globalThumbnail}.png` : `/projects/${path}/thumbnail.png`;

	return (
		<div
			style={{
				width: "300px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
			}}
		>

			<h2 className="projectTitle" style={{ width: "100%", margin: "0 8px" }}>
				{name}
			</h2>

			<a href={adjustedPath} style={{ marginTop: "10px" }}>
				<Image width={300} height={170} src={thumbnailPath} alt={thumbnailAlt || name} />
			</a>

			<div style={{ marginTop: "8px", width: "100%" }}>
				<h5 style={{ margin: 0 }}>{description}</h5>
			</div>
		</div>
	);
}

function ServerStatus({ endpoint = null, currentServer = false }) {
	const [healthMessage, setHealthMessage] = React.useState("Loading...");
	const [healthColor, setHealthColor] = React.useState("yellow");

	React.useEffect(() => {
		if (currentServer) {
			setHealthMessage("Healthy");
			setHealthColor("green");
		} else if (endpoint) {
			checkServerStatus(endpoint);
		}
	}, [endpoint, currentServer]);

	return <strong className="textOutline" style={{ color: healthColor }}>{healthMessage}</strong>;

	async function checkServerStatus(endpoint) {
		try {
			const response = await fetch(endpoint + "/api/health");

			if (!response.ok) {
				throw new Error(response.status);
			}

			const data = await response.json();

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
