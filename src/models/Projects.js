const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
})

const Project = new mongoose.Schema({ 
    name: { type: String },
    price: {type: Number},
    startDate:  {type: String},
    endDate: {type: String}, 
    task: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    customerInfo: customerSchema,
});

const Projects = mongoose.model('Project', Project);
module.exports = Projects
