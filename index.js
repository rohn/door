var request = require('request');
var config = require('config');
var push = require( 'pushover-notifications' );
var Door = require('./door');

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

var payload = {};

var p = new push({
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

var msg = config.get('pushover');

var sendMessageTimeout = [];

var opendoor = function(whichDoor) {
  console.log('Door opened: ' + whichDoor);
  payload.state = 'open';
  msg.message = "The " + whichDoor + " is open.";

  sendMessageTimeout[whichDoor] = setTimeout(function() {
    p.send(msg, function(err, result) {
      if (err) {
        //do something appropriate
      }
    });
  }, 5000);
};

var closedoor = function(whichDoor) {
  console.log('Door closed: ' + whichDoor);
  payload.state = 'closed';
  clearTimeout(sendMessageTimeout[whichDoor]);
};

var pins = config.get('pins');
var door = [];

pins.forEach(function(pin) {
  door.push(new Door(pin.sensor, pin.which));
  door.last().on('open', opendoor);
  door.last().on('close', closedoor);
});

console.log('Set up and watching doors');