const dotenv = require('dotenv')
dotenv.config()

const projectServices = require('../services/projectsServices.js');

class projectsController{
    //[post]: /project
    async createProject(req,res,next){
        try{
            const { type,name,price,startDate,endDate,customerInfo } = req.body
            const projectSaved = await projectServices.createProjectDb(req.body);
            if(!projectSaved){
                return res.status(409).json({
                    message: 'bad request'
                })
            }
            return res.status(200).json({
                errCode: 0,
                data: projectSaved,
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[get]: /project
    async getProjject(req,res,next){
        try{
            const projectFinded = await projectServices.getProjjectDb(req.query);
            if(!projectFinded){
                return res.status(409).json({
                    errCode: 1,
                    message: 'bad request'
                })
            }
            return res.status(201).json({
                errCode: 0,
                data: projectFinded,
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                message: 'error server'
            })
        }
    }

    //[delete]: /project (type: delete-users)
    async deleteUserProjject(req,res,next){
        try{
            const usersDeleted = await projectServices.deleUsersInProject(req.body);
            if(!usersDeleted){
                return res.status(409).json({
                    errCode: 1,
                    message: 'bad request'
                })
            }
            return res.status(201).json({
                errCode: 0,
                data: usersDeleted,
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                message: 'error server'
            })
        }
    }
}

module.exports = new projectsController()