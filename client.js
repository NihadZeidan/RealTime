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

let bidding = document.getElementById('bidding');

socket.on('showLatest', total => {
    totalFromUser = total.total
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

let counter = 5

product.addEventListener('click', () => {

    socket.emit('startBidding', counter);
    clearTimeout();
});



let auctionEnd = document.getElementById('auctionEnd')
    // let showNext = document.getElementById('showNext')
let end = document.getElementById('endAt')
    // let endAtTwo = document.getElementById('endAtTwo')

socket.on('liveCounter', (data) => {

    counter = data;

    end.innerHTML = `${counter} Seconds left`

    // endAtTwo.innerHTML = `${counter} Seconds left`


    setTimeout(() => {
        if (totalFromUser == 0) {
            product.style.display = 'none';
            auctionEnd.style.display = 'block'
            bidding.style.display = 'none'
            auctionEnd.innerHTML = `No one Bidded on the product, please come back agin on another auction !!`
        } else {

            product.style.display = 'none';
            auctionEnd.style.display = 'block'
            bidding.style.display = 'none'
            auctionEnd.innerHTML = `The product Sold to ${lastUser}, please come back agin on another auction !!`

        }

        // showNext.style.display = 'block';
        counter = 0
    }, 5000);

});

// let productTwo = document.getElementById("productTwo");

// showNext.addEventListener('click', () => {
//     product.style.display = 'none'
//     productTwo.style.display = 'block'
//     clearTimeout();


// });



// productTwo.addEventListener('click', () => {
//     // product.removeEventListener()

//     socket.emit('startBidding', counter);
//     clearTimeout();
// });