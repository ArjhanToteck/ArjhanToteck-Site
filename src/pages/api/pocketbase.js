import PocketBase from "pocketbase";

export let pocketbase;

export default function startPocketbase(req, res, calledAsPath = true) {
	// check if server already started
	if (!pocketbase) {
		console.log("Starting pocketbase server");

		pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_SERVER);
	}

	// only end http if called as path (not called by another script)
	if (calledAsPath) {
		return res.status(200).send("Ok.");
	}
};