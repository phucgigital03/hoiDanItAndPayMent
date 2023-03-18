const Task = require('../models/Tasks')

class tasksServices{
    static filterTask = {};
    static handleFilterTask(queryString){
        if(queryString.populate){
            const populateValue = queryString.populate.split(',');
            const arrFilterTask = populateValue.map((pathEle,ind)=>{
                return {
                    path: pathEle
                }
            })
            this.filterTask.populate = arrFilterTask
        }
        return this.filterTask;
    }

    //[post]: /createTask
    async createTaskSv(bodyData){
        try{
            const { type,name,feature } = bodyData
            let taskCreated;
            if(type === 'emty-task'){
                taskCreated = await Task.create({
                    name: name,
                    feature: feature,
                })
            }
            return taskCreated
        }catch(err){
            console.log(err)
            return 0;
        }
    }

    //[get]: /getTask
    async getTask(queryString){
        try{
            const { limit,page } = queryString
            let skip = (page - 1) * limit;
            const filter = tasksServices.handleFilterTask(queryString);
            const taskFinded = await Task.find({})
            .skip(skip)
            .limit(limit)
            .populate(filter.populate)
            tasksServices.filterTask = {};
            return taskFinded;
        }catch(err){
            console.log(err)
            return 0;
        }
    }

    //[patch]: /updateTask
    async updateTask(bodyData){
        try{
            const { id,dataUpdate } = bodyData
            const taskUpdated = await Task.updateOne({_id: id},{
                ...dataUpdate
            })
            return taskUpdated;
        }catch(err){
            console.log(err)
            return 0
        }
    }
}

module.exports = new tasksServices()