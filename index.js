const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;
const users = require('./data.json');

// set the view engine to ejs
app.use(expressLayouts);
app.use(
	session({
		secret: 'ko%AOK)#@()(#',
		resave: true,
		saveUninitialized: true
	})
);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});

app.use('/', require('./modules/home'));

app.get('/api/users', function(req, res) {
	// res.send('Hello Sapi');
	res.json(users);
});

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);
