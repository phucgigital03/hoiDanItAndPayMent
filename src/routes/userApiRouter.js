const express = require('express')
const userApiRouter = express.Router();

const userApiController = require('../controllers/userApiController.js');
const uploadFile = require('../middlewares/uploadFile.js');

userApiRouter.get('/users',userApiController.users)
userApiRouter.post('/users',userApiController.createUsers)
userApiRouter.patch('/users',userApiController.updateUsers)
userApiRouter.delete('/users',userApiController.deleteUsers)

module.exports = userApiRouter
