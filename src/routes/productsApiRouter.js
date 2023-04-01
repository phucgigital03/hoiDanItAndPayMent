const express = require('express')
const productsApiRouter = express.Router();

const productsApiController = require('../controllers/productsController.js')

productsApiRouter.get('/products',productsApiController.products)

module.exports = productsApiRouter
