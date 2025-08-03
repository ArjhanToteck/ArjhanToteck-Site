import { Server } from "socket.io";

export let io;

const CORS_ALLOWED_DOMAINS = JSON.parse(process.env.CORS_ALLOWED_DOMAINS);

// req and res are only used when this api is called as a path
export default function startSocketio(req, res, calledAsPath = true) {
	// check if server already started
	if (!res.socket.server.io) {
		console.log("Starting socket.io server");

		// starts server
		io = new Server(res.socket.server, {
			cors: {
				origin: CORS_ALLOWED_DOMAINS,
				methods: ["GET", "POST"]
			}
		});
		res.socket.server.io = io;

		// listen for connection
		io.on("connection", (socket) => {
			// echo
			socket.on("echo", message => {
				socket.emit("echo", message);
			});
		});
	}

	// only end http if called as path (not called by another script)
	if (calledAsPath) {
		return res.status(200).send("Ok.");
	}
};