const mongoose = require('mongoose');
const configJson = require('../common/config.json');

const userSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    role: String,
    active: Boolean,
    createdDate: { type: Date, default: Date.now }
});

mongoose.connect(configJson.databaseUrl, { useNewUrlParser: true })
    .catch((err) => { throw err });

const createUser = async (userId, firstName, lastName, role, active) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    const user = new User({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        role: role,
        active: active
    });

    const existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length > 0) {
        return "UserId already exists!.....";
        //throw Error('UserId already exists!.....');
    }

    user.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully created the user!.....";
}

module.exports.createUser = createUser;

