const Blogs = require('../models/Blogs')

class blogServices{
    //[get]: /
    async getBlogsSv(queryData){
        try{
            const blogs = await Blogs.find({})
            return blogs
        }catch(err){
            console.log(err)
            return 0;
        }
    }

    //[post]: /
    async createBlogSv(dataBody){
        try{
            let blog;
            const { type,title,description } = dataBody
            if(type === 'empty'){
                blog = await Blogs.create({
                    title: title,
                    description: description
                })
            }
            return blog
        }catch(err){
            console.log(err)
            return 0;
        }
    }
}

module.exports = new blogServices()