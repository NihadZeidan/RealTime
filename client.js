'use strict'
const socket = io('http://localhost:5000');

let text = ''
text = window.prompt("What is Your name");
socket.emit('newUser', text);





let addFive = document.getElementById("addFive");
let totalFromUser = 0

addFive.addEventListener('click', function(e) {

    let dollar = parseInt(addFive.value)

    totalFromUser += dollar;

    socket.emit('increasePrice', totalFromUser);

});



socket.on("greeting", (data) => {
    let head = document.createElement('h1')
    head.innerHTML = `${data} has joind`
    let header = document.getElementById("header")
    header.append(head);
});



socket.on('showLatest', total => {
    totalFromUser = total.total
    let bidding = document.getElementById('bidding');
    let userDiv = document.createElement('div');

    let para = document.createElement('p');
    para.innerHTML = `${total.name} ${total.total}`
    userDiv.append(para);
    bidding.append(userDiv);
});

socket.on('liveBid', (latest) => {
    totalFromUser = latest
})