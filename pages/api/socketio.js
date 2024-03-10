import { Server } from "socket.io";

export let io;

const startServer = (req, res) => {
	// check if server already started
	if (!res.socket.server.io) {
		console.log("Starting socket.io server");

		// starts server
		io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on("connection", socket => {
			socket.on("echo", message => {
				console.log("echo", message);
				socket.emit("echo", message);
			});
		});
	}
	res.end();
};

export default startServer;