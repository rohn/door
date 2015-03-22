var request = require('request');
var config = require('config');
var push = require( 'pushover-notifications' );
var Door = require('./door');
var door = new Door();

var payload = {};

var p = new push({
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

var msg = {
  message: 'The basement door is open',
  title: 'Basement Door',
  sound: 'incoming',
  priority: 1
};

var sendMessageTimeout;

door.on('open', function() {
  console.log('Door opened');
  payload.state = 'open';

  sendMessageTimeout = setTimeout(function() {
    p.send(msg, function(err, result) {
      if (err) {
        //do something appropriate
      }
    });
  }, 5000);
});

door.on('close', function() {
  console.log('Door closed');
  payload.state = 'closed';
  clearTimeout(sendMessageTimeout);
});
