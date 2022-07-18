const axios = require('axios');
const Discord = require('../services/Discord');

const urls = {
    '!deploy': 'http://shouldideploy.today/api?tz=America/Sao_Paulo',
};

const getApiData = async (url, callback) => {
    const response = await axios.get(url);

    if (response.status === 200) {
        callback(200, response.data);
    } else if (response.status > 500) {
        callback(response.status, null);
    }
}

const sendMessageToChannelByChannelId = async (channelId, msg) => {
    const channel = await Discord.getChannelById(channelId);

    if (!channel) {
        return false;
    }

    return sendMessageToChannel(channel, msg);
}

const sendMessageToChannel = async (channel, msg) => {
    return Discord.sendMessage(channel, msg);
};

const sendDeployMessage = (channel) => {
    getApiData(urls['!deploy'], (status, data) => {
        if (status === 200) {
            sendMessageToChannel(channel, `${data.shouldideploy ? '👍' : '👎'} ${data.message}`);
        } else {
            sendMessageToChannel(channel, `Error: ${status}`);
        }
    });
};

const setTime = (params) => {
    if (params.length === 0 || params[0] === '' || parseInt(params[0]) === NaN) {
        return 6;
    }

    return params[0];
};

module.exports = { sendMessageToChannelByChannelId, sendMessageToChannel, sendDeployMessage, setTime };
