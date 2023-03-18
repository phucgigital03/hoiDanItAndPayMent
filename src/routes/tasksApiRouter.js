const express = require('express')
const tasksApiRouter = express.Router();

const tasksController = require('../controllers/tasksApiController.js');

tasksApiRouter.get('/task',tasksController.getTask)
tasksApiRouter.post('/task',tasksController.createTask)
tasksApiRouter.patch('/task',tasksController.updateTask)

module.exports = tasksApiRouter
