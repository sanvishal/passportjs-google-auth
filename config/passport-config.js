const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const KEYS = require('./keys');
const User = require('../models/user-model');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(function(user) {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			//config for google strategy
			callbackURL: '/auth/google/redirecturi',
			clientID: KEYS.GOOGLE.clientID,
			clientSecret: KEYS.GOOGLE.clientSecret
		},
		function(accessToken, refreshToken, profile, done) {
			//callback when user has completed selecting the consent screen and before the redirect URI
			//console.log(profile);
			//check if user has already signedup(query the db to find one id that matches with currentUser)
			User.findOne({ googleid: profile.id }).then(function(currentUser) {
				if (currentUser) {
					//we already has the user so don't create a new one
					console.log(currentUser);
					done(null, currentUser);
				} else {
					//create User if doesn't exist
					new User({
						username: profile.displayName,
						googleid: profile.id,
						profilepic: profile._json.image.url
					})
						.save()
						.then(function(newUser) {
							console.log(newUser);
							done(null, newUser);
						});
				}
			});
		}
	)
);
