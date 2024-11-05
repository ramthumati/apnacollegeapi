const express = require('express');
var bodyParser = require('body-parser')
const { createUser, updateUser } = require('./src/users/user');

const app = express();

app.use(bodyParser.json());

app.post('/user', async (req, res) => {
    try {
        var createUserStatus = await createUser(req.body.userId, req.body.firstName, req.body.lastName, req.body.role, req.body.active);
        if (createUserStatus.toString().indexOf('UserId already exists') < 0 ) {
            res.status(200).send('Successfully created the user!.....');
        }
        else {
            res.status(500).send(createUserStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});

app.put('/user', async (req, res) => {
    try {
        var updateUserStatus = await updateUser(req.body.userId, req.body.firstName, req.body.lastName, req.body.role, req.body.active);
        res.status(200).send('Successfully updated the user!.....');
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }    
})

app.listen(5000, () => {
    console.log('Listening on port 5000!.....');
});



