const express = require('express');
const Discord = require('./services/Discord');
const { runCommand } = require('./helpers/kernel');

const routes = require('./routes');

class Server {
    create() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(routes);

        return this;
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    setDiscord(token) {
        this.discord = Discord.create();
        this.discord.startHandler(runCommand);
        this.discord.login(token);
    }
}

module.exports = new Server();
