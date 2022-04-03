const server = require('./server');
const client = require('./app/services/client');
const env = require('../env');

// process.env are the environment variables in the production server
const port = process.env.PORT || env.port || 3000;
const token = process.env.TOKEN || env.token || null;

if (token === null) {
  console.error('TOKEN is required');
  process.exit(1);
}

// Make login to Discord API
client.login(token);

// Start the server to keep the connection alive
server.listen(port, () => {
  console.log(`${new Date().toISOString()} App started on port ${port}`);
});
