const mongoose = require('mongoose');

const Cart = new mongoose.Schema({ 
    userId: { type: mongoose.Schema.Types.ObjectId },
    status: {type: String, default: 'active'},
    mondifiedOn: {type: Date, default: Date.now},
    producId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    ],
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservations"
        }
    ]
});

const Carts = mongoose.model('Carts', Cart);
module.exports = Carts
