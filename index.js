const express = require('express');
var bodyParser = require('body-parser')
const { createUser, updateUser, getUser, deleteUser } = require('./src/users/user');
const { getDsaTopic, createDsaTopic, updateDsaTopic, deleteDsaTopic } = require('./src/dsa/dsatopics');
const { getDsaProblem, createDsaProblem, updateDsaProblem, deleteDsaProblem } = require('./src/dsa/dsaProblems');

const app = express();

app.use(bodyParser.json());

var cors = require("cors");
const { fromOptions } = require('mongodb/lib/write_concern');

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))

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

/* DsaTopics */
app.get('/dsaTopic/:dsaTopicName', async (req, res) => {
    try {
        var getDsaTopicStatus = await getDsaTopic(req.params.dsaTopicName);
        if (getDsaTopicStatus.toString().indexOf('Dsa Topic does not exist') < 0 ) {
            res.status(200).send(getDsaTopicStatus);
        }
        else {
            res.status(500).send(getDsaTopicStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});


app.post('/dsaTopic', async (req, res) => {
    try {
        var createDsaTopicStatus = await createDsaTopic(req.body.topicName);
        if (createDsaTopicStatus.toString().indexOf('Dsa Topic already exists') < 0 ) {
            res.status(200).send('Successfully created the Dsa Topic!.....');
        }
        else {
            res.status(500).send(createDsaTopicStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});

app.put('/dsaTopic', async (req, res) => {
    try {
        var updateDsaTopicStatus = await updateDsaTopic(req.body.topicName);
        if (updateDsaTopicStatus.toString().indexOf('Topic Name not found') < 0 ) {
            res.status(200).send('Successfully updated the Topic Name!.....');
        }
        else {
            res.status(500).send(updateDsaTopicStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})

app.delete('/dsaTopic', async (req, res) => {
    try {
        var deleteDsaTopicStatus = await deleteDsaTopic(req.body.topicName);
        if (deleteDsaTopicStatus.toString().indexOf('Dsa Topic not found') < 0 ) {
            res.status(200).send('Successfully deleted the Dsa Topic!.....' + deleteDsaTopicStatus);
        }
        else {
            res.status(500).send(deleteDsaTopicStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})




/* DsaProblems */
app.get('/dsaProblem/:dsaTopicName/:dsaProblemName', async (req, res) => {
    try {
        var getDsaProblemStatus = await getDsaProblem(req.params.dsaTopicName, req.params.dsaProblemName);
        if (getDsaProblemStatus.toString().indexOf('Dsa Problem does not exist') < 0 ) {
            res.status(200).send(getDsaProblemStatus);
        }
        else {
            res.status(500).send(getDsaProblemStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});


app.post('/dsaProblem', async (req, res) => {
    try {
        var createDsaProblemStatus = await createDsaProblem(req.body.topicName, req.body.problemName);
        if (createDsaProblemStatus.toString().indexOf('Dsa problem already exists') < 0 ) {
            res.status(200).send('Successfully created the Dsa Problem!.....');
        }
        else {
            res.status(500).send(createDsaProblemStatus);
        }
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    }
});

app.put('/dsaProblem', async (req, res) => {
    try {
        var updateDsaProblemStatus = await updateDsaProblem(req.body.topicName, req.body.problemName);
        if (updateDsaProblemStatus.toString().indexOf('Problem Name not found') < 0 ) {
            res.status(200).send('Successfully updated the Problem Name!.....');
        }
        else {
            res.status(500).send(updateDsaProblemStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})

app.delete('/dsaProblem', async (req, res) => {
    try {
        var deleteDsaProblemStatus = await deleteDsaProblem(req.body.topicName, req.body.problemName);
        if (deleteDsaProblemStatus.toString().indexOf('Problem not found') < 0 ) {
            res.status(200).send('Successfully deleted the Dsa Problem!.....' + deleteDsaProblemStatus);
        }
        else {
            res.status(500).send(deleteDsaProblemStatus);
        }  
    }
    catch(err) {
        res.status(500).send('An error occurred while processing your request. The error is ' + err);
    } 
})


app.listen(5000, () => {
    console.log('Listening on port 5000!.....');
});



