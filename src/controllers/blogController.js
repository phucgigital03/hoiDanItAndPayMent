const dotenv = require('dotenv')
dotenv.config()

const blogServices = require('../services/blogServices.js')

class blogController{
    //[get]: /
    async allBlog(req,res,next){
        try{
            const blogs = await blogServices.getBlogsSv(req.query);
            return res.status(200).render("allBlog.ejs",{
                blogs: blogs
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[get]: /
    async formCreateBlog(req,res,next){
        try{
            return res.status(200).render("formCreateBlog.ejs")
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[post]: /
    async createBlog(req,res,next){
        try{
            const blog = await blogServices.createBlogSv(req.body);
            return res.status(200).json({
                errCode: 0,
                data: blog
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