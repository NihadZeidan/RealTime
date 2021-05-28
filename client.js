'use strict'
const socket = io();

let text = ''
text = window.prompt("What is Your name");
socket.emit('newUser', text);

let totalFromUser = 0
let lastUser = ''

let addFive = document.getElementById("addFive");
let addTwen = document.getElementById('addTwen');
let addTen = document.getElementById('addTen');
// ---------------------------------------------------

addFive.addEventListener('click', function(e) {
    let dollar = parseInt(addFive.value);
    totalFromUser += dollar;
    socket.emit('increasePrice', totalFromUser);

});


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


// ----------------------------------------------



socket.on("greeting", (data) => {
    let head = document.createElement('h1');
    head.innerHTML = `${data} has joined`
    let header = document.getElementById("header");
    header.append(head);
});

let bidding = document.getElementById('bidding');

socket.on('showLatest', total => {
    totalFromUser = total.total

    let para = document.createElement('p');
    para.innerHTML = `${total.name} ${total.total}$`
    bidding.append(para);
    lastUser = total.name

    window.setInterval(function() {
        var elem = document.getElementById('bidding');
        elem.scrollTop = elem.scrollHeight;
    }, 0);

});

socket.on('liveBid', (latest) => {
    totalFromUser = latest;
    let user = document.getElementById('lastBid')
    user.innerHTML = `Last Bid is ${latest}$`
});

// --------------------------------------------------------------------



let product = document.getElementById('product');

let counter = 60

product.addEventListener('click', add)



function add() {
    socket.emit('startBidding', counter);
    clearTimeout();
}



let auctionEnd = document.getElementById('auctionEnd')
let end = document.getElementById('endAt')
let timeOut = 0;

socket.on('liveCounter', (data) => {

    counter = data;

    timeOut = counter * 1000


    end.innerHTML = `${counter} Seconds left`

    setTimeout(() => {
        if (totalFromUser == 0) {
            product.removeEventListener('click', add);
            product.style.display = 'none';
            auctionEnd.style.display = 'block'
            bidding.style.display = 'none'
            auctionEnd.innerHTML = `No one Bidded on the product, please come back agin on another auction <a href='/'> Home</a>!!`

        } else {
            product.removeEventListener('click', add);
            product.style.display = 'none';
            auctionEnd.style.display = 'block'
            bidding.style.display = 'none'
            auctionEnd.innerHTML = `The product Sold to ${lastUser}, please come back again on another auction  !!`

        }

        counter = 0

    }, timeOut);

});