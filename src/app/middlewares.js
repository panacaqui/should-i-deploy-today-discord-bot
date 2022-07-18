module.exports = {
    hasToBeAdmin: (request, response, next) => {
        next();
    },

    channelHasToExist: (request, response, next) => {
        const { channelId } = request.params;

        if (!channelId) {
            return response.status(400).send('Channel not found in the URL');
        }

        next();
    }
};
