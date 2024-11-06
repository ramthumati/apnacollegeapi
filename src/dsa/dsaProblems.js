const mongoose = require('mongoose');
const configJson = require('../common/config.json');

const dsaProblemSchema = new mongoose.Schema({
    topicName: String,
    problemName: String,
    createdDate: { type: Date, default: Date.now }
});

mongoose.connect(configJson.databaseUrl, { useNewUrlParser: true })
    .catch((err) => { throw err });



const getDsaProblem = async (topicName, problemName) => {
    problemName = problemName.toLowerCase();

    const DsaProblem = mongoose.model('DsaProblem', dsaProblemSchema);

    var existingDsaProblem = await DsaProblem.find({
        topicName: topicName,
        problemName: problemName
    });

    if (existingDsaProblem.length === 0) {
        return "Dsa Problem does not exist!.....";
    }

    existingDsaProblem = existingDsaProblem[0];
    return existingDsaProblem;
}

const createDsaProblem = async (topicName, problemName) => {
    problemName = problemName.toLowerCase();

    const DsaProblem = mongoose.model('DsaProblem', dsaProblemSchema);

    const dsaProblem = new DsaProblem({
        topicName: topicName,
        problemName: problemName,
    });

    var existingDsaProblem = await DsaProblem.find({
        topicName: topicName,
        problemName: problemName
    });

    if (existingDsaProblem.length > 0) {
        return "Dsa problem already exists!.....";
    }

    dsaProblem.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully created the Dsa Problem!.....";
}

const updateDsaProblem = async (topicName, problemName) => {
    problemName = problemName.toLowerCase();

    const DsaProblem = mongoose.model('DsaProblem', dsaProblemSchema);

    var existingDsaProblem = await DsaProblem.find({
        topicName: topicName,
        problemName: problemName
    });

    if (existingDsaProblem.length === 0) {
        return "Problem Name not found!.....";
    }

    existingDsaProblem = existingDsaProblem[0];

    existingDsaProblem.problemName = problemName;

    await existingDsaProblem.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully updated the topic name!.....";
}

const deleteDsaProblem = async (topicName, problemName) => {
    problemName = problemName.toLowerCase();

    const DsaProblem = mongoose.model('DsaProblem', dsaProblemSchema);

    var existingDsaProblem = await DsaProblem.find({
        topicName: topicName,
        problemName: problemName
    });

    if (existingDsaProblem.length === 0) {
        return "Problem not found!.....";
    }

    existingDsaProblem = existingDsaProblem[0];

    await existingDsaProblem.deleteOne(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully deleted the problem name!.....";
}

module.exports = { createDsaProblem, updateDsaProblem, getDsaProblem, deleteDsaProblem };

