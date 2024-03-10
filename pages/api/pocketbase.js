import PocketBase from "pocketbase";

export let pocketbase;

export default function startPocketbase(req, res) {
    // check if server already started
    if (!pocketbase) {
        console.log("Starting pocketbase server");

        pocketbase = new PocketBase("http://127.0.0.1:8090");
    }
    res.end();
};