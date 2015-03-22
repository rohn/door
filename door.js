var Gpio = require('onoff').Gpio;
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var config = require('config');

console.log('setting up');

var Door = module.exports = function() {
  EventEmitter.call(this);
  this.isOpen = false;
  var pins = config.get('pins');

  var sensor = new Gpio(pins.sensor, 'in', 'both');

  var update = function(err, value) {
    this.emit(value ? 'close' : 'open')
  }.bind(this);

  sensor.read(update);
  sensor.watch(update);

  Door.door = this;
}

util.inherits(Door, EventEmitter);
