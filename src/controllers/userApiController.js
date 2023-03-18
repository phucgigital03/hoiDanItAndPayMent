const dotenv = require('dotenv')
dotenv.config()
const Users = require('../models/Users.js');

class userApiController{
    //[get]: /users
    async users(req,res,next){
        try{
            const users = await Users.find({});
            return res.status(200).json({
                errorCode: 0,
                data: users
            })
        }catch(err){
            res.status(500).json({
                message: 'error server'
            })
            return;
        }
    }

    //[post]: /users
    async createUsers(req,res,next){
        try{
            const { email,city,name } = req.body
            const users = await Users.create({
                email,
                name,
                city,
            })
            
            return res.status(201).json({
                errorCode: 0,
                users: users,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[patch]: /users
    async updateUsers(req,res,next){
        try{
            const { email,city,name,idUser } = req.body
            const users = await Users.updateOne({_id: idUser},{
                email: email,
                city: city,
                name: name,
            })
            return res.status(201).json({
                errorCode: 0,
                data: users,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[delete]: /users
    async deleteUsers(req,res,next){
        try{
            const { idUser } = req.body
            const users = await Users.deleteOne({_id: idUser})
            return res.status(201).json({
                errorCode: 0,
                data: users,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }
}

module.exports = new userApiController()