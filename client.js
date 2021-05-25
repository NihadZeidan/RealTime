'use strict'
const socket = io('http://localhost:5000');

let text = ''
text = window.prompt("What is Your name");
socket.emit('newUser', text);

let addFive = document.getElementById("addFive");
let addTen = document.getElementById('addTen')
let addTwen = document.getElementById('addTwen')


let totalFromUser = 0
let lastUser = ''

// ----------------------------------------------
addTwen.addEventListener('click', function(e) {
    let dollar = parseInt(addTwen.value);
    totalFromUser += dollar;
    socket.emit('increasePrice', totalFromUser);
});

addTen.addEventListener('click', function(e) {
    let dollar = parseInt(addTen.value);
    totalFromUser += dollar;
    socket.emit('increasePrice', totalFromUser);
});

addFive.addEventListener('click', function(e) {
    let dollar = parseInt(addFive.value);
    totalFromUser += dollar;
    socket.emit('increasePrice', totalFromUser);

});
// ----------------------------------------------

socket.on("greeting", (data) => {
    let head = document.createElement('h1');
    head.innerHTML = `${data} has joined`
    let header = document.getElementById("header");
    header.append(head);
});

socket.on('showLatest', total => {
    totalFromUser = total.total
    let bidding = document.getElementById('bidding');
    let userDiv = document.createElement('div');
    let para = document.createElement('p');
    para.innerHTML = `${total.name} ${total.total}$`
    userDiv.append(para);
    bidding.append(userDiv);
    lastUser = total.name

});

socket.on('liveBid', (latest) => {
    totalFromUser = latest
});

// --------------------------------------------------------------------

let product = document.getElementById('product');
let end = document.getElementById('endAt')



let counter = 15

product.addEventListener('click', () => {
    socket.emit('startBidding', counter);
});



setTimeout(() => {
    product.setAttribute('style', 'display: none');
    if (totalFromUser == 0) {
        window.alert(`Not Sold`);
    } else {
        window.alert(`Sold to ${lastUser}`);
    }

    // clearInterval()

}, 15000);

socket.on('liveCounter', (data) => {
    // socket.emit('updatedCounter', counter)
    counter = data;
    end.innerHTML = `${counter} Seconds left`

});