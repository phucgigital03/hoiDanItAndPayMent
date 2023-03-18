const Project = require('../models/Projects');

class projectServices{
    static filterProject = {}
    static handleFilterProject(queryString){
        if(queryString.populate){
            const filterPopulate = queryString.populate.split(',').map((path)=>{
                return {
                    path: path
                }
            })
            this.filterProject.populate = filterPopulate
        }
        return this.filterProject;
    }

    //[post]: /project
    async createProjectDb(infoCreateProject){
        console.log(infoCreateProject)
        try{
            let projectSaved;
            if(infoCreateProject.type === 'empty-project'){
                projectSaved = await Project.create(infoCreateProject)
            }
            if(infoCreateProject.type === 'add-user'){
                const arrUserId = infoCreateProject.userId
                const userIdLength = arrUserId.length;
                const projectFinded = await Project.findById(infoCreateProject.projectId);
                for(let i = 0; i < userIdLength;++i){
                    if(!projectFinded.users.includes(arrUserId[i])){
                        projectFinded.users.push(arrUserId[i]);
                    }
                }
                projectSaved = await projectFinded.save()
            }
            if(infoCreateProject.type === 'add-task'){
                const arrTaskId = infoCreateProject.taskId
                const taskIdLength = arrTaskId.length;
                const projectFinded = await Project.findById(infoCreateProject.projectId);
                for(let i = 0; i < taskIdLength;++i){
                    if(!projectFinded.task.includes(arrTaskId[i])){
                        projectFinded.task.push(arrTaskId[i]);
                    }
                }
                projectSaved = await projectFinded.save()
            }
            return projectSaved
        }catch(err){
            console.log(err);
            return 0;
        }
    }

    //[get]: /project
    async getProjjectDb(queryString){
        try{
            const { limit,page } = queryString
            const skip = (page - 1) * limit
            const filter = projectServices.handleFilterProject(queryString);
            const projectFinded = await Project.find({})
            .skip(skip)
            .limit(limit)
            .populate(filter.populate)
            projectServices.filterProject = {};
            return projectFinded;
        }catch(err){
            console.log(err);
            return 0;
        }
    }

    //[delete]: /delete
    async deleUsersInProject(bodyData){
        try{
            const { type,projectId,userIds } = bodyData
            let dataProject;
            if(type === 'delete-users'){
                dataProject = await Project.updateOne({_id: projectId},{
                    $pull: {
                        users: { $in: userIds }
                    }
                })
            }
            return dataProject
        }catch(err){
            console.log(err)
            return 0;
        }
    }
}

module.exports = new projectServices()