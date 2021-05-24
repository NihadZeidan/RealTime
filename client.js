'use strict';


const socket = io('http://localhost:5000');



socket.on("greeting", (data) => {
    console.log(data);
});