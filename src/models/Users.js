const mongoose = require('mongoose');

const User = new mongoose.Schema({ 
    name: { type: String , required: true, default: ''}, 
    city: { type: String , required: true},
    email: { type: String , required: true}
});

const Users = mongoose.model('User', User);
module.exports = Users
