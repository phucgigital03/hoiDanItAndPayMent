const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectMongoDb = async ()=>{
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    }
    try{
        await mongoose.connect(process.env.DB_HOSTNAME_ALTAS,options);
        console.log('connect successful')
    }catch(err){
        console.log(err)
        return 1;
    }
}

module.exports = connectMongoDb
