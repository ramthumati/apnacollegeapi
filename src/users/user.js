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
    .catch((err) => console.log(err));

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

    console.log(existingUser);
    if (existingUser.length > 0) {
        console.log('UserId already exists!.....', existingUser);
        return;
    }

    user.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });    
    
    console.log(3);
}

module.exports.createUser = createUser;

