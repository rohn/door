var request = require('request');
var config = require('config');
var push = require( 'pushover-notifications' );
var Door = require('./door');

var payload = {};

var p = new push({
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});
var msg = config.get('pushover');

var sendMessageTimeout;

var opendoor = function() {
  console.log('Door opened');
  payload.state = 'open';

  sendMessageTimeout = setTimeout(function() {
    p.send(msg, function(err, result) {
      if (err) {
        //do something appropriate
      }
    });
  }, 5000);
};

var closedoor = function() {
  console.log('Door closed');
  payload.state = 'closed';
  clearTimeout(sendMessageTimeout);
};

var door = new Door();
door.on('open', opendoor)
door.on('close', closedoor);
