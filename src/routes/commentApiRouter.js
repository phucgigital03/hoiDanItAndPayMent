const express = require('express')
const commentApiRouter = express.Router();

const commentController = require('../controllers/commentController.js');

commentApiRouter.get('/comment',commentController.allComment)
commentApiRouter.post('/comment',commentController.createComment)

module.exports = commentApiRouter
