"use client";

import { useEffect } from "react";
import io from "socket.io-client";

export default function page() {
    useEffect(() => {
        fetch("/api/socketio").finally(() => {
            const socket = io();

            socket.on("connect", () => {
                console.log("connected")
                socket.emit("echo", "something")
            });

            socket.on("echo", data => {
                console.log("echo", data)
            });
        })
    }, []);

    return <h1>Socket.io</h1>
}