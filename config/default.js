module.exports = {

  pins: [
    {"sensor": 18, "which": 'basement'},
    {"sensor": 16, "which": 'garage'}
  ],

  pushover: {
    message: 'The basement door is open',
    title: 'Door Warning',
    sound: 'incoming',
    priority: 1
  }

}
