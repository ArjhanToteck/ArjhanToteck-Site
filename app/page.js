const Projects = require("./Projects");

export default function Index() {
	return (
		<main>
			<h1 class="glitch" data-text="Welcome.">Welcome.</h1>


			I'm Arjhan. I make stuff sometimes.

			<h2 className="glitch" data-text="Projects" style={{ fontSize: "24px" }}>
				Projects
			</h2>

			<div id="projects" style={{ display: "flex", flexWrap: "wrap" }}>
				{Projects.map((project, index) => (
					<Project key={index} project={project} />
				))}
			</div>
		</main>
	);
}

function Project({ project }) {
	const { path, thumbnailAlt, description } = project || {};

	return (
		<div style={{ width: "300px" }}>

			<a href={path}>
				<img width="300" src={`${path}/thumbnail.png`} alt={thumbnailAlt} />
			</a>
			<h5>{description}</h5>

		</div>
	)
}