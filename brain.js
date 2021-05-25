'use strict';

const cors = require('cors')
const PORT = process.env.PORT || 5000

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");

server.listen(PORT, () => console.log("listening"));

app.use(express.static('./'));

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const io = require("socket.io")(server);


// -----------------------------------------------------------

let latest = 0;

io.on('connection', (socket) => {
    let users = ''
    socket.on('newUser', data => {
        users = data
        socket.broadcast.emit('greeting', data);

    });

    console.log('New user Connecter ' + socket.id);

    socket.on('increasePrice', (total) => {
        io.emit('showLatest', { total: total, name: users });
        latest = total
    });
    console.log(latest);

    socket.emit('liveBid', latest);

    socket.on('userName', name => {
        console.log(name);
        io.emit('showName', name)
    })
});