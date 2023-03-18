const dotenv = require('dotenv')
dotenv.config()

const hostName = (req,res,next)=>{
    if(process.env.NODE_ENV === 'development'){
        res.locals.HOST_NAME = `${process.env.HOST_NAME}:${process.env.PORT}`
    }else if(process.env.NODE_ENV === 'production'){
        res.locals.HOST_NAME = `abc`
    }
    next()
}

module.exports = hostName
