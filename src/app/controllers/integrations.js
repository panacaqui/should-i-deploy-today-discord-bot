const { setTime, sendDeployMessage, sendMessageToChannel } = require('../helpers/helper');
const { URL } = require('../../../env');

var intervals = {};

const interations = {
    '!deploy': (channel) => sendDeployMessage(channel),

    '!start': (channel, params) => {
        const time = setTime(params)
        sendMessageToChannel(channel, `From now on, the message will be sent automatically every ${time} hours.\nTo stop use !stop.`);

        sendDeployMessage(channel);

        // Set interval in 3600000 ml (1h)
        intervals[channel.id] = setInterval(() => {
            sendDeployMessage(channel);
        }, time * 3600000);
    },

    '!stop': (channel) => {
        clearInterval(intervals[channel.id]) && delete intervals[channel.id];
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
    },

    '!log': (channel) => {
        sendMessageToChannel(channel, `Use the post route ${URL}/${channel.id} for automatic log submissions.`);
    }
};

module.exports = interations;
