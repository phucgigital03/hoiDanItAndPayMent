const express = require('express')
const customerApiRouter = express.Router();

const customerApiController = require('../controllers/customerApiController.js');
const {uploadFileSingle,uploadFileOneAndMore,uploadFileMultiple} = require('../middlewares/uploadFile.js');
const { oneOrMultipleFile,multipleFile,singleFile } = require('../config/fieldNameFiles.js');


customerApiRouter.get('/customer',customerApiController.customers)
customerApiRouter.post('/customer',uploadFileSingle(singleFile),customerApiController.createCustomer)
customerApiRouter.post('/customer-many',customerApiController.createManyCustomer)
customerApiRouter.patch('/customer',uploadFileSingle(singleFile),customerApiController.updateCustomer)
customerApiRouter.patch('/customer-restore',customerApiController.restoreCustomer)
customerApiRouter.delete('/customer',customerApiController.deleteSoftCustomer)
customerApiRouter.delete('/customer-many',customerApiController.deleteSoftCustomers)
customerApiRouter.post('/file',uploadFileSingle(singleFile),customerApiController.fileUpload)

// test query-params
customerApiRouter.get('/customer-query-params/:id/:slug',(req,res,next)=>{
    console.log("query: ",req.query)
    console.log("params: ",req.params)
    return res.status(201).json({
        errCode: 0,
        data: {
            query: req.query,
            params: req.params
        }
    })
})


module.exports = customerApiRouter
