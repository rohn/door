var Gpio = require('onoff').Gpio;
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var config = require('config');

var Door = module.exports = function(sensorNumber, whichDoor) {
  EventEmitter.call(this);

  var sensor = new Gpio(sensorNumber, 'in', 'both');

  var update = function(err, value) {
    this.emit(value ? 'close' : 'open', whichDoor)
  }.bind(this);

  sensor.read(update);
  sensor.watch(update);

  Door.door = this;
}

util.inherits(Door, EventEmitter);
