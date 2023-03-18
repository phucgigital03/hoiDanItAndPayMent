const express = require('express')
const checkOutsApiRouter = express.Router();

const checkOutsController = require('../controllers/checkOutsApiController.js');

checkOutsApiRouter.get('/checkOut',checkOutsController.renderCheckOut)
checkOutsApiRouter.post('/create-paypal-order',checkOutsController.createOrder);
checkOutsApiRouter.post('/capture-paypal-order',checkOutsController.captureOrder);
checkOutsApiRouter.post('/create-payment-intent-stripe',checkOutsController.createOrderStripe);
checkOutsApiRouter.get('/ordered',checkOutsController.orderedStripe);

module.exports = checkOutsApiRouter
