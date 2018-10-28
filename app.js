//define a port to listen to process.env.PORT number is defined by cloud service like heroku/now.sh
const port = process.env.PORT || 3000;
//call express
const express = require('express');
//require auth and profile routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
//require passport config files
const PassportConfig = require('./config/passport-config');
//require mongodb client
const mongoose = require('mongoose');
//require DBURI and other important stuff
const KEYS = require('./config/keys');
//make a cookie session
const CookieSession = require('cookie-session');
//require passport for middleware
const passport = require('passport');

//instantiate express app
const app = express();

//use a port
app.set('port', process.env.PORT || 3000);

//use cookie session
app.use(
	CookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [ KEYS.SESSIONKEY.cookieKey ]
	})
);

//instantiate and use passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb using mongoose through mlab
mongoose.connect(KEYS.MONGODB.dbURI, function(err) {
	if (err) {
		throw err;
	}
	console.log('Connected to DB!');
});

//setup view engine
app.set('view engine', 'ejs');

//use the routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//get request home page
app.get('/', function(req, res) {
	res.render('index', {
		user: req.user
	});
});

//listen to requests
app.listen(app.get('port'), function() {
	console.log('app started at port: ' + app.get('port'));
});
