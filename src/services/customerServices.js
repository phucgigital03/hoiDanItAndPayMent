const Customers = require('../models/Customers.js');
const { deleFile } = require('../utils/deleteFile.js')



class customerServices{
    static filterCustomers = {};
    static handleFilterCustomer(queryString){
        if(queryString.name){
            const regex = new RegExp(`^${queryString.name}`, "i");
            this.filterCustomers.name = { $regex: regex }
        }
        if(queryString.address){
            const arrAddress = queryString.address.split(',');
            this.filterCustomers.address = { $in: arrAddress }
        }
        return this.filterCustomers
    }
    //[get]: /customer
    async customers(queryString){
        try{
            let { limit,page } = queryString;
            let customers = null;
            if(limit && page){
                let skip = ( page - 1 ) * limit
                const filter = customerServices.handleFilterCustomer(queryString)
                customers = await Customers.find(filter).limit(limit).skip(skip).exec()
                customerServices.filterCustomers = {};
            }else{
                customers = await Customers.find({});
            }
            return customers
        }catch(err){
            return 0;
        }
    }

    //[post]: /customer-many
    async createManyCustomer(customerArr){
        try{
            const customers = await Customers.insertMany(customerArr);
            return customers
        }catch(err){
            return 0;
        }
    }

    //[post]: /createCustomer
    async createCustomer(infoCustomer){
        try{
            const customer = await Customers.create({
                ...infoCustomer
            })
            return customer;
        }catch(err){
            return 0;
        }   
    }

    //[patch]: /updateCustomer
    async updateCustomer(infoCustomer){
        try{
            const { id,name,email,phone,description,address,image } = infoCustomer
            let fileName = '';
            const customer = await Customers.findOneAndUpdate({_id: id},{
                name,
                email,
                phone,
                description,
                address,
                image
            })
            fileName = customer.image
            await deleFile(fileName);
            return 1;
        }catch(err){
            return 0;
        }   
    }

    //[patch]: /restoreCustomer
    async restoreCustomer(id){
        try{
            const restore = await Customers.restore({_id: id}).exec()
            return restore
        }catch(err){
            return 0;
        }
    }

    //[delete]: /customer
    async deleteCustomer(id){
        try{
            const customer = await Customers.delete({_id: id})
            return customer
        }catch(err){
            return 0;
        }
    }

    //[delete]: /customer-many
    async deleteSoftCustomers(ids){
        try{
            const customersDeleted = await Customers.delete({_id : { $in: ids}})
            return customersDeleted
        }catch(err){
            return 0;
        }
    }
}

module.exports = new customerServices()