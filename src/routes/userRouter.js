const express = require('express')
const userRouter = express.Router();

const userController = require('../controllers/userController.js');

userRouter.get('/',userController.home)
userRouter.get('/createUser',userController.formCreateUser)
userRouter.post('/createUser',userController.createUser)
userRouter.patch('/editUser',userController.editUser)
userRouter.delete('/deleteUser',userController.deleteUser)

module.exports = userRouter
