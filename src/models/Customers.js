const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Customer = new mongoose.Schema(
{ 
    name: { type: String , required: true, default: ''}, 
    email: { type: String , required: true},
    phone: { type: String , required: true},
    image: {type: String},
    description: {type: String},
    address: {type: String},
},
{
    timestamps: true
});

Customer.plugin(mongoose_delete,{ overrideMethods: 'all' });
const Customers = mongoose.model('Customer', Customer);
module.exports = Customers
