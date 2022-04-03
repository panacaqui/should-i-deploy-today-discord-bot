const axios = require('axios');

const urls = {
  '!deploy': 'http://shouldideploy.today/api?tz=America/Sao_Paulo',
};

// Get json data from the API and execute the callback function
const getApiData = async (url, callback) => {
  const response = await axios.get(url);

  if (response.status === 200) {
    callback(200, response.data);
  } else if (response.status > 500) {
    callback(response.status, null);
  }
}

// Send the message to the channel
const sendMessageToChannel = (channel, msg) => {
  channel.send({ content: msg });
};

// Send the deploy message to the channel
const sendDeployMessage = (channel) => {
  getApiData(urls['!deploy'], (status, data) => {
    if (status === 200) {
      sendMessageToChannel(channel, `${data.shouldideploy ? '👍' : '👎'} ${data.message}`);
    } else {
      sendMessageToChannel(channel, `Error: ${status}`);
    }
  });
};

// Set the time to send the message in hours
// Default is 24h
const setTime = (params) => {
  if (params.length === 0 || params[0] === '' || parseInt(params[0]) === NaN) {
    return 24;
  }

  return params[0];
};

module.exports = { sendDeployMessage, setTime, sendMessageToChannel };
