const mongoose = require('mongoose');
const configJson = require('../common/config.json');

const userSchema = new mongoose.Schema({
    userId: String,
    password: String,
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

    var existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length === 0) {
        return "UserId does not exist!.....";
    }

    existingUser = existingUser[0];
    return existingUser;
}

const createUser = async (userId, password, firstName, lastName, role, active) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    const user = new User({
        userId: userId,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
        active: active
    });

    var existingUser = await User.find({
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

const updateUser = async (userId, password, firstName, lastName, role, active) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    var existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length === 0) {
        return "UserId not found!.....";
    }

    existingUser = existingUser[0];

    existingUser.password = password;
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

const deleteUser = async (userId) => {
    userId = userId.toLowerCase();

    const User = mongoose.model('User', userSchema);

    var existingUser = await User.find({
        userId: userId
    });

    if (existingUser.length === 0) {
        return "UserId not found!.....";
    }

    existingUser = existingUser[0];

    await existingUser.deleteOne(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully deleted the user!.....";
}

module.exports = { createUser, updateUser, getUser, deleteUser };

