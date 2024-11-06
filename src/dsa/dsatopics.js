const mongoose = require('mongoose');
const configJson = require('../common/config.json');

const dsaTopicSchema = new mongoose.Schema({
    topicName: String,
    createdDate: { type: Date, default: Date.now }
});

mongoose.connect(configJson.databaseUrl, { useNewUrlParser: true })
    .catch((err) => { throw err });


const getDsaTopicsAll = async () => {
    const DsaTopic = mongoose.model('DsaTopic', dsaTopicSchema);

    var existingDsaTopic = await DsaTopic.find();

    if (existingDsaTopic.length === 0) {
        return "Dsa Topic does not exist!.....";
    }

    //existingDsaTopic = existingDsaTopic[0];
    return existingDsaTopic;
}

const getDsaTopic = async (topicName) => {
    topicName = topicName.toLowerCase();

    const DsaTopic = mongoose.model('DsaTopic', dsaTopicSchema);

    var existingDsaTopic = await DsaTopic.find({
        topicName: topicName
    });

    if (existingDsaTopic.length === 0) {
        return "Dsa Topic does not exist!.....";
    }

    existingDsaTopic = existingDsaTopic[0];
    return existingDsaTopic;
}

const createDsaTopic = async (topicName) => {
    topicName = topicName.toLowerCase();

    const DsaTopic = mongoose.model('DsaTopic', dsaTopicSchema);

    const dsaTopic = new DsaTopic({
        topicName: topicName,
    });

    var existingDsaTopic = await DsaTopic.find({
        topicName: topicName
    });

    if (existingDsaTopic.length > 0) {
        return "Dsa Topic already exists!.....";
    }

    dsaTopic.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully created the Dsa Topic!.....";
}

const updateDsaTopic = async (topicName) => {
    topicName = topicName.toLowerCase();

    const DsaTopic = mongoose.model('DsaTopic', dsaTopicSchema);

    var existingDsaTopic = await DsaTopic.find({
        topicName: topicName
    });

    if (existingDsaTopic.length === 0) {
        return "Topic Name not found!.....";
    }

    existingDsaTopic = existingDsaTopic[0];

    existingDsaTopic.topicName = topicName;

    await existingDsaTopic.save(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully updated the topic name!.....";
}

const deleteDsaTopic = async (topicName) => {
    topicName = topicName.toLowerCase();

    const DsaTopic = mongoose.model('DsaTopic', dsaTopicSchema);

    var existingDsaTopic = await DsaTopic.find({
        topicName: topicName
    });

    if (existingDsaTopic.length === 0) {
        return "Dsa Topic not found!.....";
    }

    existingDsaTopic = existingDsaTopic[0];

    await existingDsaTopic.deleteOne(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });

    return "Successfully deleted the topic name!.....";
}

module.exports = { createDsaTopic, updateDsaTopic, getDsaTopic, getDsaTopicsAll, deleteDsaTopic };

