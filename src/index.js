const Server = require('./app/Server');
const { TOKEN, PORT, URL } = require('../env');

if (TOKEN === null || PORT === null || URL === null) {
    throw new Error('TOKEN, PORT and URL are required');
}

const app = Server.create();

app.start(PORT ?? 3000);
app.setDiscord(TOKEN);
