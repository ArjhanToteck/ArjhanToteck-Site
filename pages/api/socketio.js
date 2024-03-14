import { Server } from "socket.io";

export let io;

export default function startSocketio(req, res) {
	// check if server already started
	if (!res.socket.server.io) {
		console.log("Starting socket.io server");

		// starts server
		io = new Server(res.socket.server, {
			cors: {
				origin: JSON.parse(process.env.CORS_ALLOWED_DOMAINS),
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
	res.end();
};