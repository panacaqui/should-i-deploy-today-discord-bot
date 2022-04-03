const { Client, Intents } = require('discord.js');
const { runCommand } = require('../helpers/kernel');

// Create a new Discord client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

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
    runCommand(message);
  }
});

module.exports = client;
