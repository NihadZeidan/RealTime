'use strict';

const cors = require('cors')
const PORT = process.env.PORT || 5000

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");



app.listen(PORT, () => console.log("listening"));

app.use(express.static('./'));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('index.html')
});



const io = require("socket.io")(server, { cors: { origin: '*' } });




io.on('connection', (socket) => {
    socket.emit('greeting', "Welcome!");
});

// module.exports = app