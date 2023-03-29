const dotenv = require('dotenv')
dotenv.config()

const commentServices = require('../services/commentServices.js')

class blogController{
    //[get]: /
    async allComment(req,res,next){
        try{
            const childComment = await commentServices.getComments(req.query);
            return res.status(200).json({
                message: 'oke',
                data: childComment
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[post]: /
    async createComment(req,res,next){
        try{
            const comment = await commentServices.createCommentSv(req.body)
            return res.status(200).json({
                message: 'oke',
                data: comment
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }
}   

module.exports = new blogController()