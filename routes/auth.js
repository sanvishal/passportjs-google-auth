const router = require('express').Router();
const passport = require('passport');

//just normal DB query login
router.get('/login', function(req, res) {
	res.render('login', {user: req.user});
});

//logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
	console.log('logged out!');
});

//google+ login
router.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile' ]
	})
);

router.get('/google/redirecturi', passport.authenticate('google'), function(req, res) {
	console.log('google Authenticated!');
	res.redirect('/profile/');
});

module.exports = router;
