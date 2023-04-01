const mongoose = require('mongoose');

const Product = new mongoose.Schema({ 
    title: {type: String},
    description: {type: String},
    size: { type: Array },
    color: {type: Array},
    price: {type: Number},
    sale: {type: Number},
    from: {type: String},
});

const Products = mongoose.model('Products', Product);
module.exports = Products
