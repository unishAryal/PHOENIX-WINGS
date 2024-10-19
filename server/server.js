console.log("Starting the app");

const express = require('express');
const app = express();
const http = require('http');

const { Server } = require('socket.io');
const cors = require('cors');
const { ExpressPeerServer} = require('peer');


const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
	debug: true,
	path: "/myapp",
});

app.use("/myapp", peerServer);

console.log("server is a starting thing");

let isSocketInitialized = false;
let io;

const SocketHandler = (req, res) => {
    if (!isSocketInitialized) {
        io = new Server(server, {
            cors: {
                origin: "*", // Replace with your frontend URL in production
                methods: ["GET", "POST"]
            }
        });
        
        io.on('connection', (socket) => {
            console.log("A client connected on socket id", socket.id);
        
            socket.on('joinRoom', (roomId, userId) => {
                console.log(`new user with ${userId} userid, joined ${roomId} room.`);
        
                // Make sure to join the room and emit the event inside this callback
                socket.join(roomId);  // This will allow the user to join the room
                socket.broadcast.to(roomId).emit('userConnected', userId);  // Notify others in the room
            });
        });
        
        
        isSocketInitialized = true;
        console.log("io initialized");
    } else {
        console.log('Socket already initialized.');
    }

    if (res) {
        res.end();
    }
}

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    SocketHandler(); // Initialize the socket when the server starts
});

