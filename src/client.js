const { Client, Intents } = require('discord.js');
const axios = require('axios');

// Create a new Discord client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

// Keep the interval function to stoop when is required
var interval;

// Set the interaction functions
const interations = {
  '!deploy': (message) => sendDeployMessage(message),

  '!start': (message, params) => {
    const time = setTime(params)
    message.channel.send({ content: `From now on, the message will be sent automatically every ${time} hours.\nTo stop use !stop.` });
    sendDeployMessage(message);

    // Set the interval to send the message every 24 hours
    interval = setInterval(() => {
      sendDeployMessage(message);
    }, time * 3600000);
  },

  '!stop': (message) => {
    clearInterval(interval);
    message.channel.send({ content: `From now on, you will no longer receive automatic messages.` });
  },

  '!help': (message) => {
    response = 'Welcome to SHOULD I DEPLOY TODAY BOT!\n\n';
    response += 'The messages are all used by the https://shouldideploy.today/.\n';
    response += 'Visit the GitHub page for more information https://github.com/panacaqui/should-i-deploy-today-discord-bot\n\n'
    response += 'To use, use the commands listed below:\n';
    response += '**!deploy**                  Manually calling the deploy message\n';
    response += '**!start time**            Starts sending messages automatically every x hours. If not passed, it will be set every 24h. Ex.: **!start 2**\n';
    response += '**!stop**                      Stops the automatic sending of messages';
    message.channel.send({ content: response });
  }
};

// Get the deploy message from the API and send it to the callback function
async function getDeployMessage(callback) {
  const response = await axios.get('http://shouldideploy.today/api?tz=America/Sao_Paulo');
  if (response.status === 200) {
    callback(response.data);
  }
}

// Send the deploy message to the channel
function sendDeployMessage(message) {
  getDeployMessage((data) => {
    message.channel.send({ content: generateMessage(data) });
  });
}

// Generate the message to be sent using the deploy message get from the API
function generateMessage(data) {
  return `${data.shouldideploy ? '👍' : '👎'} ${data.message}`;
}

// Check if the message is a command and execute the interaction function
function getCommand(message) {
  const args = message.content.split(' ');

  const command = args[0];
  const params = args.slice(1);

  if (interations[command]) {
    interations[command](message, params);
  }
}

// Set the time to send the message in hours
// Default is 24h
function setTime(params) {
  if (params.length === 0 || params[0] === '' || parseInt(params[0]) === NaN) {
    return 24;
  }

  return params[0];
}

client.on('ready', () => {
  console.log(`${new Date().toISOString()} Client is ready: ${client.user.tag}`);
});

// Just read the message and check if it is a command and if the command is valid
client.on('messageCreate', (message) => {
  // Certify that the message is't from the bot
  if (message.author.bot) {
    return;
  }

  // Define the command has to start with '!'
  if (message.content.startsWith('!')) {
    getCommand(message);
  }
});

module.exports = client;
