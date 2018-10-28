const router = require('express').Router();

const authCheck = function(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
};

router.get('/', authCheck, function(req, res) {
	res.render('profile', {
		user: req.user
	});
});

module.exports = router;
