// Importing the required modules
const express = require("express");   // Importing the Express framework
const app = express();   // Creating an Express application
const path = require("path");   // Importing the path module for working with file and directory paths
const http = require("http");   // Importing the built-in HTTP module
const {Server} = require("socket.io");   // Importing the Socket.IO library and extracting the Server class

// Creating an HTTP server using the Express application
const server = http.createServer(app);

// Creating a new instance of Socket.IO by passing the HTTP server
const io = new Server(server);

// Serving static files from the root directory of the application
app.use(express.static(path.resolve("")));

// Handling GET requests to the root path ("/") and sending the index.html file
app.get("/", (req, res) => {
    return res.sendFile("index.html");
})

// Starting the server and listening on port 3000
server.listen(3000, ()=>{
    console.log("Port connected!")
})
