// // server.js

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

// // Handle WebSocket connections here
// io.on("connection", (socket) => {
//   console.log("A new user has connected", socket.id);

//   // Listen for incoming messages from clients
//   socket.on("message", (message) => {
//     // Broadcast the message to all connected clients
//     io.emit("message", message);
//   });

//   // Handle disconnections
//   socket.on("disconnect", () => {
//     console.log(socket.id, " disconnected");
//   });
// });

// server.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


// server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

// let users = {};

// io.on('connection', (socket) => {
//   console.log('A new user has connected', socket.id);

//   socket.on('join', (username) => {
//     users[socket.id] = username;
//     io.emit('userList', Object.values(users)); // Broadcast the updated user list
//   });

//   socket.on('message', (message) => {
//     io.emit('message', message); // Broadcast message to all users
//   });

//   socket.on('disconnect', () => {
//     delete users[socket.id];
//     io.emit('userList', Object.values(users)); // Broadcast the updated user list
//   });
// });

// server.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });



const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // For development, restrict this for production
    credentials: true,
  },
});

// Sample API Route
app.get("/api", (req, res) => {
  res.send("Hello from the backend!");
});

// Socket.IO connection
let users = {};

io.on('connection', (socket) => {
  console.log('A new user has connected', socket.id);

  socket.on('join', (username) => {
    users[socket.id] = username;
    io.emit('userList', Object.values(users)); // Broadcast the updated user list
  });

  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast message to all users
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('userList', Object.values(users)); // Broadcast the updated user list
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

