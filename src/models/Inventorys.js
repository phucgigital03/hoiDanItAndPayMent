const mongoose = require('mongoose');

const Inventory = new mongoose.Schema({ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    quatity: {type: Number},
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservations"
        }
    ]
});

const Inventorys = mongoose.model('Inventorys', Inventory);
module.exports = Inventorys
