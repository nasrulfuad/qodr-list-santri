const router = require('express').Router();
const {
	home,
	about,
	contact,
	show,
	insert,
	insertPost
} = require('./controller');
const { errHandler } = require('../../core/helpers');

router.get('/', errHandler(home));

router.get('/:id/show', errHandler(show));

router.get('/about', errHandler(about));

router.get('/contact', errHandler(contact));

router.get('/insert', errHandler(insert));

router.post('/insert', errHandler(insertPost));

module.exports = router;
