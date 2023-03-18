const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
})

const Task = new mongoose.Schema({ 
    name: { type: String }, 
    feature: {type: String},
    projectInfo: projectSchema,
    userInfo: userSchema,
});

const Tasks = mongoose.model('Task', Task);
module.exports = Tasks
