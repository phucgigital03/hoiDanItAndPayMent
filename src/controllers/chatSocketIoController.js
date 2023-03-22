const dotenv = require('dotenv')
dotenv.config()

class chatSocketIoController{
    //[get]: /
    async home(req,res,next){
        try{
            res.status(200).render('chatSocketIO.ejs')
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }
}   

module.exports = new chatSocketIoController()