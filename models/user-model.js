const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	googleid: String,
	profilepic: String
});

let User = mongoose.model('user', UserSchema);

module.exports = User;
