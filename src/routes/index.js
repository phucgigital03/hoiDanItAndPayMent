const userRouter = require('./userRouter.js')
const userApiRouter = require('./userApiRouter.js');
const checkOutsApiRouter = require('./checkOutsApiRouter.js');
const blogApiRouter = require('./blogApiRouter.js');
const commentApiRouter = require('./commentApiRouter');

const routes = (app) => {
    // web
    app.use('/',userRouter)

    // v1/api/
    app.use('/v1/api/',userApiRouter)
    app.use('/v1/api/',checkOutsApiRouter)
    app.use('/v1/api/',blogApiRouter)
    app.use('/v1/api/',commentApiRouter)
}

module.exports = routes