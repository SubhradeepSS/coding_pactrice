'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}

function Activity(amount) {
    this.amount = amount
    
    this.setAmount = value => {
        if(value <= 0) {
            return false
        }
        this.amount = value
        return true
    }
    
    this.getAmount = () => {
        return this.amount
    }
}

Activity.prototype.getAmount = () => {
    return Activity.prototype.amount
}

Activity.prototype.setAmount = value => {
    if(value <= 0) {
        return false
    }
    Activity.prototype.amount = value
    return true
}

function Payment(amount, receiver) {
    // this.amount = amount
    
    Activity.call(this, amount)
    this.receiver = receiver
    
    this.setReceiver = receiver => {
        this.receiver = receiver
    }
    
    this.getReceiver = () => {
        return this.receiver
    }
}

// Payment.prototype = Object.create(Activity.prototype)
Payment.prototype.setReceiver = receiver => {
    Payment.prototype.receiver = receiver
}

Payment.prototype.getReceiver = () => {
    return Payment.prototype.receiver
}

function Refund(amount, sender) {
    // this.amount = amount
    
    Activity.call(this, amount)
    this.sender = sender
    
    this.getSender = () => {
        return this.sender
    }
    
    this.setSender = sender => {
        this.sender = sender
    }
}
// Refund.prototype = Object.create(Activity.prototype)
Refund.prototype.getSender = () => {
    return Refund.prototype.sender
}

Refund.prototype.setSender = sender => {
    Refund.prototype.sender = sender
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const objectType = readLine().trim();
    
    const inputsForObjectCreation = readLine().trim().split(' ');
    const updatedAmount = parseInt(readLine().trim());
    const updatedSenderReceiver = readLine().trim();
    switch(objectType) {
        case 'Payment':
            const paymentObj = new Payment(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Payment object created with amount ${paymentObj.getAmount()} and receiver ${paymentObj.getReceiver()}\n`);
            if(paymentObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            paymentObj.setReceiver(updatedSenderReceiver);
            ws.write(`Receiver updated to ${updatedSenderReceiver}\n`);
            ws.write(`Payment object details - amount is ${paymentObj.getAmount()} and receiver is ${paymentObj.getReceiver()}\n`);
            ws.write(`Payment.prototype has property setAmount: ${Payment.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Payment.prototype has property getAmount: ${Payment.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Payment.prototype has property setReceiver: ${Payment.prototype.hasOwnProperty('setReceiver')}\n`);
            ws.write(`Payment.prototype has property getReceiver: ${Payment.prototype.hasOwnProperty('getReceiver')}\n`);
            break;
        case 'Refund':
            const refundObj = new Refund(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Refund object created with amount ${refundObj.getAmount()} and sender ${refundObj.getSender()}\n`);
            if(refundObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            refundObj.setSender(updatedSenderReceiver);
            ws.write(`Sender updated to ${updatedSenderReceiver}\n`);
            ws.write(`Refund object details - amount is ${refundObj.getAmount()} and sender is ${refundObj.getSender()}\n`);
            ws.write(`Refund.prototype has property setAmount: ${Refund.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Refund.prototype has property getAmount: ${Refund.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Refund.prototype has property setSender: ${Refund.prototype.hasOwnProperty('setSender')}\n`);
            ws.write(`Refund.prototype has property getSender: ${Refund.prototype.hasOwnProperty('getSender')}\n`);
            break;
        default:
            break;
    }
}