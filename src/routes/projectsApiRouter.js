const express = require('express')
const projectsApiRouter = express.Router();

const projectController = require('../controllers/projectsApiController');

projectsApiRouter.get('/project',projectController.getProjject)
projectsApiRouter.post('/project',projectController.createProject)
projectsApiRouter.delete('/project',projectController.deleteUserProjject)

module.exports = projectsApiRouter
