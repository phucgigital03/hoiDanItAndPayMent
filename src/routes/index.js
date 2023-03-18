const userRouter = require('./userRouter.js')
const userApiRouter = require('./userApiRouter.js');
const customerApiRouter = require('./customerApiRouter.js');
const projectsApiRouter = require('./projectsApiRouter.js');
const tasksApiRouter = require('./tasksApiRouter.js');
const checkOutsApiRouter = require('./checkOutsApiRouter.js');

const routes = (app) => {
    // web
    app.use('/',userRouter)

    // v1/api/
    app.use('/v1/api/',userApiRouter)
    app.use('/v1/api/',customerApiRouter)
    app.use('/v1/api/',projectsApiRouter)
    app.use('/v1/api/',tasksApiRouter)
    app.use('/v1/api/',checkOutsApiRouter)
}

module.exports = routes