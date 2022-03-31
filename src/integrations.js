const { setTime, sendDeployMessage, sendMessageToChannel } = require('./function');

// Keep the interval function to stoop when is required
var interval;

// Set the interaction functions
const interations = {
  '!deploy': (channel) => sendDeployMessage(channel),

  '!start': (channel, params) => {
    const time = setTime(params)
    sendMessageToChannel(channel, `From now on, the message will be sent automatically every ${time} hours.\nTo stop use !stop.`);

    // Send first message to channel
    sendDeployMessage(channel);

    // Set the interval to send the message every <time> hours
    interval = setInterval(() => {
      sendDeployMessage(channel);
    }, time * 3600000);
  },

  '!stop': (channel) => {
    clearInterval(interval);
    sendMessageToChannel(channel, `From now on, you will no longer receive automatic messages.`);
  },

  '!help': (channel) => {
    msg = 'Welcome to SHOULD I DEPLOY TODAY BOT!\n\n';
    msg += 'The messages are all used by the https://shouldideploy.today/.\n';
    msg += 'Visit the GitHub page for more information https://github.com/panacaqui/should-i-deploy-today-discord-bot\n\n'
    msg += 'To use, use the commands listed below:\n';
    msg += '**!deploy**                  Manually calling the deploy message\n';
    msg += '**!start time**            Starts sending messages automatically every x hours. If not passed, it will be set every 24h. Ex.: **!start 2**\n';
    msg += '**!stop**                      Stops the automatic sending of messages';
    sendMessageToChannel(channel, msg);
  }
};

module.exports = interations;
