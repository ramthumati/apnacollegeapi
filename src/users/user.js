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



const getUser = async (userId) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    const existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length === 0) {
        return "UserId does not exist!.....";
    }

    return existingUser;
}

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
    }

    user.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully created the user!.....";
}

const updateUser = async (userId, firstName, lastName, role, active) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    var existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length === 0) {
        return "UserId not found!.....";
    }

    existingUser = existingUser[0];

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.role = role;
    existingUser.active = active;

    await existingUser.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully updated the user!.....";
}

module.exports = { createUser, updateUser, getUser };

