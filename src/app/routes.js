const { Router } = require('express');

const middlewares = require('./middlewares');
const LogController = require('./controllers/LogController');

const router = Router();

router.get('/', (request, response) => {
    response.sendStatus(204);
});

router.get('/log/list', middlewares.hasToBeAdmin, LogController.list);

router.post('/log/:channelId', middlewares.channelHasToExist, LogController.log);

module.exports = router;
