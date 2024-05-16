const Projects = require("./Projects");

export default function Index() {
	return (
		<main>
			<section className="red">
				<br></br>
				<h1 style={{ fontSize: "75px" }}>
					Welcome.
				</h1>
				<h2>
					I'm Arjhan. I make stuff sometimes. Sometimes it's good, too.
				</h2>
				<p>
					Quick note: projects that use websockets might take a while to load. They're not bugged, I'm just broke. My bad.
				</p>
				<br></br>
			</section>
			<div className="divider topDivider"></div>
			<section style={{ justifyContent: "center" }}>
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

			<a href={path}>
				<img width="300" src={`${path}/thumbnail.png`} alt={thumbnailAlt} />
			</a>
			<h5>{description}</h5>
		</div>
	)
}