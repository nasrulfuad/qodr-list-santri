const router = require('express').Router();
const { home, about, contact, show } = require('./controller');
const { errHandler } = require('../../core/helpers');

router.get('/', errHandler(home));

router.get('/:id/show', errHandler(show));

router.get('/about', errHandler(about));

router.get('/contact', errHandler(contact));

module.exports = router;
