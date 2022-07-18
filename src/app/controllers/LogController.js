const LogRepository = require('../Repositories/LogRepository');
const { sendMessageToChannelByChannelId } = require('../helpers/helper');

async function send(channelId, log) {
    return sendMessageToChannelByChannelId(channelId, log.toString());
}

class LogController {
    async list(request, response) {
        const logs = await LogRepository.list();

        response.json(logs);
    }

    async log(request, response) {
        const log = LogRepository.create(request.body);

        if (!log) {
            return response.status(400).json({
                message: 'Invalid data'
            });
        }

        const { channelId } = request.params;

        const status = await send(channelId, log);

        if (!status) {
            response.status(500).json({
                message: 'Error sending log'
            });
        } else {
            response.sendStatus(204);
        }
    }
}

module.exports = new LogController();
