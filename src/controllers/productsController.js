const dotenv = require('dotenv')
dotenv.config()

class productsController{
    //[get]: /
    async products(req,res,next){
        try{
            return res.status(201).json({
                message: "oke"
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: "error server"
            })
        }
    }

    //[post]: /
    
}   

module.exports = new productsController()