import PocketBase from "pocketbase";

export let pocketbase;

export default function startPocketbase(req, res) {
    // check if server already started
    if (!pocketbase) {
        console.log("Starting pocketbase server");

        pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_SERVER);
    }
    res.end();
};