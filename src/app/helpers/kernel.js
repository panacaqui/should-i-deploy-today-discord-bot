const { sendMessageToChannel } = require('../helpers/helper');
const interations = require('../controllers/integrations');

const getArgs = (content) => {
    const args = content.split(' ');

    return {
        command: args[0],
        params: args.slice(1)
    };
};

const runCommand = (message) => {
    const args = getArgs(message.content);

    if (interations[args.command]) {
        interations[args.command](message.channel, args.params);
    } else {
        sendMessageToChannel(message.channel, 'Invalid command. Use !help to see the list of commands.');
    }
};

module.exports = { runCommand };
