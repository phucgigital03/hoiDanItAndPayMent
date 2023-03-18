const dotenv = require('dotenv')
dotenv.config()

const tasksServices = require('../services/tasksServices.js')

class tasksController{
    //[post]: /createTask
    async createTask(req,res,next){
        try{
            const taskCreated = await tasksServices.createTaskSv(req.body);
            return res.status(201).json({
                message: 'oke',
                data: taskCreated
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[get]: /getTask
    async getTask(req,res,next){
        try{
            const taskFinded = await tasksServices.getTask(req.query);
            if(!taskFinded){
                return res.status(409).json({
                    message: 'bad request',
                })
            }
            return res.status(201).json({
                message: 'oke',
                data: taskFinded
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[patch]: /updateTask
    async updateTask(req,res,next){
        try{
            const taskUpdated = await tasksServices.updateTask(req.body);
            return res.status(201).json({
                errorCode: 0,
                data: taskUpdated
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }
}

module.exports = new tasksController()