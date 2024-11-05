const express = require('express');
var bodyParser = require('body-parser')
const { createUser, updateUser, getUser, deleteUser } = require('./src/users/user');

const app = express();

app.use(bodyParser.json());

app.get('/user/:userId', async (req, res) => {
    try {
        var getUserStatus = await getUser(req.params.userId);
        if (getUserStatus.toString().indexOf('UserId does not exist') < 0 ) {
            res.status(200).send(getUserStatus);
        }
        else {
            res.status(500).send(getUserStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});


app.post('/user', async (req, res) => {
    try {
        var createUserStatus = await createUser(req.body.userId, req.body.password, req.body.firstName, req.body.lastName, req.body.role, req.body.active);
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
        var updateUserStatus = await updateUser(req.body.userId, req.body.password, req.body.firstName, req.body.lastName, req.body.role, req.body.active);
        if (updateUserStatus.toString().indexOf('UserId not found') < 0 ) {
            res.status(200).send('Successfully updated the user!.....');
        }
        else {
            res.status(500).send(updateUserStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})

app.delete('/user', async (req, res) => {
    try {
        var deleteUserStatus = await deleteUser(req.body.userId);
        if (deleteUserStatus.toString().indexOf('UserId not found') < 0 ) {
            res.status(200).send('Successfully deleted the user!.....' + deleteUserStatus);
        }
        else {
            res.status(500).send(deleteUserStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})

app.listen(5000, () => {
    console.log('Listening on port 5000!.....');
});



