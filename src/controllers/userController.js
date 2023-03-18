const dotenv = require('dotenv')
dotenv.config()
const Users = require('../models/Users.js');

class userController{
    //[get]: /
    async home(req,res,next){
        try{
            const users = await Users.find({});
            res.render('home.ejs',{users: users})
            return;
        }catch(err){
            res.status(500).json({
                message: 'error server'
            })
            return;
        }
    }

    //[get]: /createUser
    formCreateUser(req,res,next){
        res.render('formCreateUser.ejs');
        return;
    }

    //[post]: /createUser
    async createUser(req,res,next){
        try{
            const { email,city,name } = req.body
            await Users.create({
                email,
                name,
                city,
            })
            res.redirect(`http://${process.env.HOST_NAME}:${process.env.PORT}`)
            return;
        }catch(err){
            res.status(500).json({
                message: 'error server'
            })
            return;
        }
    }

    //[patch]: /editUser
    async editUser(req,res,next){
        try{
            const { email,city,name,idUser } = req.body
            const userSaved = await Users.updateOne({_id: idUser},{
                email: email,
                city: city,
                name: name
            })
            console.log(userSaved)
            res.status(201).json({
                message: 'updated user'
            })
        }catch(err){
            res.status(500).json({
                message: 'error server'
            })
            return;
        }
    }

    //[delete]: /deleteUser
    async deleteUser(req,res,next){
        try{
            const { idUser } = req.body
            console.log(idUser)
            const userDeleted = await Users.deleteOne({_id: idUser});
            console.log(userDeleted)
            res.status(201).json({
                message: 'updated user'
            })
        }catch(err){
            res.status(500).json({
                message: 'error server'
            })
            return;
        }
    }
}

module.exports = new userController()