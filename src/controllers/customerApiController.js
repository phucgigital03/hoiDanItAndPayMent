const dotenv = require('dotenv');
dotenv.config()


const Customers = require('../models/Customers.js');
const customerServices = require('../services/customerServices.js');
const { deleFile } = require('../utils/deleteFile.js')

class customerApiController{
    //[get]: /customer
    async customers(req,res,next){
        try{
            let customers = null;
            const checkQueryParams = Object.keys(req.query).length;
            if(checkQueryParams){
                customers = await customerServices.customers(req.query);
            }else{
                customers = await customerServices.customers()
            }

            if(!customers){
                return res.status(409).json({
                    errorCode: 1,
                    data: 'conflict'
                })
            }
            return res.status(200).json({
                errorCode: 0,
                data: customers
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: 'error server !!'
            })
        }
    }

    //[post]: /customer
    async createCustomer(req,res,next){
        try{
            const { name,email,phone,description,address } = req.body
            const fileImages = req.file;
            let image = fileImages.filename;
            const infoCustomer = {
                name: name,
                email,
                phone,
                description,
                address,
                image,
            }
            const customer = await customerServices.createCustomer(infoCustomer);
            if(!customer){
                await deleFile(image)
                return res.status(409).json({
                    message: 'conflict infomation'
                })
            }
            return res.status(201).json({
                errorCode: 0,
                customers: customer,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[post]: /customer-many
    async createManyCustomer(req,res,next){
        try{
            const customerArr = req.body.customers;
            const customers = await customerServices.createManyCustomer(customerArr);
            if(!customers){
                return res.status(409).json({
                    message: 'info conflict'
                })
            }
            return res.status(200).json({
                message: "insert many customer success",
                customers: customers,
            })
        }catch(err){
            return res.status(500).json({
                message: "error server"
            })
        }
    }

    //[patch]: /customer
    async updateCustomer(req,res,next){
        try{
            const { idUser,name,email,phone,description,address } = req.body
            const fileImages = req.file;
            let image = fileImages.filename;
            const infoCustomer = {
                id: idUser,
                name,
                email,
                phone,
                description,
                address,
                image,
            }
            const customerUpdated = await customerServices.updateCustomer(infoCustomer);
            if(!customerUpdated){
                await deleFile(image);
                return res.status(500).json({
                    message: 'error server !!'
                })
            }
            return res.status(201).json({
                errorCode: 0,
                message: 'customer updated',
                link_page: ''
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server !!'
            })
        }
    }

    //[patch]: /customer-restore
    async restoreCustomer(req,res,next){
        try{
            const { idUser } = req.body
            const resultRestore = await customerServices.restoreCustomer(idUser);
            if(!resultRestore){
                return res.status(409).json({
                    message: 'bad request'
                })
            }
            return res.status(201).json({
                errorCode: 0,
                data: resultRestore
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[delete]: /customer
    async deleteSoftCustomer(req,res,next){
        try{
            const { idUser } = req.body
            const customerDeleted = await customerServices.deleteCustomer(idUser);
            if(!customerDeleted){
                return res.status(409).json({
                    errorCode: 0,
                    message: "bad request",
                })
            }
            return res.status(201).json({
                errorCode: 0,
                data: customerDeleted,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[delete]: /customer-many
    async deleteSoftCustomers(req,res,next){
        try{
            const { ids } = req.body
            const customerDeleted = await customerServices.deleteSoftCustomers(ids);
            if(!customerDeleted){
                return res.status(409).json({
                    errorCode: 0,
                    message: "bad request",
                })
            }
            return res.status(201).json({
                errorCode: 0,
                data: customerDeleted,
            })
        }catch(err){
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    // [post] /file
    fileUpload(req,res,next){
        console.log(req.file)
        return res.status(201).json({
            message: 'uploaded file'
        })
    }
}

module.exports = new customerApiController()