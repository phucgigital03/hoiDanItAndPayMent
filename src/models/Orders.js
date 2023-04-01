const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    name: { type: String , required: true, default: ''}, 
    email: { type: String , required: true},
})

const Order = new mongoose.Schema({ 
    address: {
        province: {type: String},
        street: {type: String},
        district: {type: String},
        otherAddress: {type: String}
    },
    payment: {type: Object},
    userId: UserInfo,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Carts"},
    status: {type: String}
});

const Orders = mongoose.model('Orders', Order);
module.exports = Orders
