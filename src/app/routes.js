const { Router } = require('express');

const middlewares = require('./middlewares');
const LogController = require('./controllers/LogController');

const router = Router();

router.get('/', (request, response) => {
    response.send({ message: 'Server is running' });
});

router.post('/log/:channelId', middlewares.channelHasToExist, LogController.log);

module.exports = router;
