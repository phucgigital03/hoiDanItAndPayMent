const Comments = require('../models/Comments.js')
const Blogs = require('../models/Blogs.js')

class commentServices{
    //[post]: /
    async createCommentSv(dataBody){
        try{
            let comment;
            const { parentId,userInfo,content,type } = dataBody
            if(type === 'empty'){
                comment = await Comments.create({
                    parentId: parentId,
                    userInfo: userInfo,
                    content: content
                })
                await Blogs.updateOne({_id: parentId},{
                    $push: {
                        commentIds: comment._id
                    }
                })
            }else if(type === 'childComment'){
                comment = await Comments.create({
                    parentId: parentId,
                    userInfo: userInfo,
                    content: content
                })
                await Comments.updateOne({_id: parentId},{
                    $push: {
                        childCommentIds: comment._id
                    }
                })
            }
            return comment
        }catch(err){
            console.log(err)
            return 0;
        }
    }

    //[get]: /
    async getComments(queryData){
        try{
            const { id,type } = queryData
            if(type === 'child'){
                const childComments = await Comments.find({_id: id})
                .populate([{ path: 'childCommentIds'}])
                .select({
                    childCommentIds: 1
                })
                return childComments
            }else if(type === 'parent'){
                const parentComments = await Blogs.find({_id: id})
                .populate([{ path: 'commentIds'}])
                .select({
                    commentIds: 1,
                    title: 1,
                    description: 1
                })
                return parentComments
            }
        }catch(err){
            console.log(err)
            return 0;
        }
    }
}

module.exports = new commentServices()