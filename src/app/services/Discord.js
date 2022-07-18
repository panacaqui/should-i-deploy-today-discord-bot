const { Client, Intents } = require('discord.js');

class Discord {
    create() {
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        });

        this.client.on('ready', () => {
            console.log(`${new Date().toISOString()} Client is ready: ${this.client.user.tag}`);
        });

        return this;
    }

    login(token) {
        try {
            this.client.login(token);
        } catch (error) {
            console.log(error);
        }
    }

    startHandler(runCommand) {
        this.client.on('messageCreate', (message) => {
            if (message.author.bot) {
                return;
            }

            if (message.content.startsWith('!')) {
                runCommand(message);
            }
        });
    }

    async getChannelById(channelId) {
        try {
            return this.client.channels.fetch(channelId);
        } catch (error) {
            return null;
        }
    }

    async sendMessage(channel, msg) {
        try {
            return channel.send({ content: msg });
        } catch (error) {
            return false;
        }
    }
}

module.exports = new Discord();
