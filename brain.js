'use strict';

const cors = require('cors')
const PORT = process.env.PORT || 3000

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");

server.listen(PORT, () => console.log("listening"));

app.use(express.static('./'));

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});
let io = require("socket.io")(server);


// -----------------------------------------------------------


let latest={} ;

io.on('connection', (socket) => {

    socket.on('startBidding', (obj) => {
        latest=obj;
        setInterval(() => {
            if (obj.counter == 0) {
                return obj.counter = 0 ,obj.totalFromUser=0;
            };
            obj.counter = obj.counter - 1;
            io.emit('liveCounter', obj.counter);
            
        }, 1000);
        console.log(obj.totalFromUser , '*-----*',obj.text)
        // io.emit('liveBid', obj.totalFromUser);
    });

    let users = ''
    socket.on('newUser', data => {
        users = data
        socket.broadcast.emit('greeting', data);
    });
    // console.log('New user Connected ' + socket.id);
    // const count = io.engine.clientsCount;
    // console.log(count);

    

    socket.on('increasePrice', (total) => {
        // console.log(total);
        // latest = total
        // console.log(latest,'ssasasa');
        io.emit('showLatest', { total: total, name: users });
    });
    
    io.emit('liveBid', latest.totalFromUser);

    


});