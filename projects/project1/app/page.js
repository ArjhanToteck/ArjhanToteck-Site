"use client";

export default function Index() {
	const sendMessage = () => {
		console.log("e");
	};

	return (
		<main>
			<h1 className="glitch" id="heading" data-text="Project1 app is working">Project1 app is working</h1>
			<div id="chat"></div>
			<div id="chatInput">
				<input
					size="35"
					autoComplete="off"
					placeholder="Message"
					autoFocus
					id="messageBox"
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</main>
	);
}
