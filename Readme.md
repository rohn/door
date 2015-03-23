#Basement Door

A little node.js app meant to run on a headless Raspberry Pi that will notify if a door is left open.

Currently it's hardcoded in the app to notify you if the door is open for more than 5 seconds. If you're quick, no notice.

#### Interesting code pattern
One of my favorite coding tricks for timing is using the Javascript `clearTimeout` function to cancel a previously started `setTimeout`.  It's fun to ask non-Javascript programmers how they'd do something similar in their language of choice.

Basically what's happening here is when the door is opened, a timeout is started:

```javascript
sendMessageTimeout = setTimeout(function() {
  // code to send message
}, 5000);
```

If nothing else happens, after 5 seconds the message will be sent. However, if the door is closed the timeout will be cleared before the message is sent:

```javascript
clearTimeout(sendMessageTimeout);
```

### Requirements
An account on the Pushover.net is required to receive the messages. Create your account and then set your TOKEN and USER (I used a group to be able to include my household simply) as environment variables.
You'll also want to set specific pins and door names in the `config/default.js` file for your use. Multiple doors can be configured without any further change to the code.


### Acknowledgements
Special thanks to Mike Frey. His presentation at the NodeMN March 2015 meetup, and his code, really was the foundation for the start of this experiment, however since I've now deviated greatly from his example it would do you well to take a look there too:
https://github.com/mikefrey/garage