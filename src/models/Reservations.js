const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({ 
    quatity: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId },
});

const Reservations = mongoose.model('Reservations', Reservation);
module.exports = Reservations
