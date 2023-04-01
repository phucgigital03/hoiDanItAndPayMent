const mongoose = require('mongoose');

const User = new mongoose.Schema({ 
    name: { type: String , required: true, default: ''}, 
    city: { type: String , required: true},
    email: { type: String , required: true},
    password: {type: String},
    token: {type: String},
    refreshToken: {type: String},
});

const Users = mongoose.model('Users', User);
module.exports = Users
