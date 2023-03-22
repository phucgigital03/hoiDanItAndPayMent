const express = require('express')
const chatSocketIoRouter = express.Router();

const chatSocketIoController = require('../controllers/chatSocketIoController.js');

chatSocketIoRouter.get('/',chatSocketIoController.home)


module.exports = chatSocketIoRouter
