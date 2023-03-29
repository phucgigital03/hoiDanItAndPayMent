const { client } = require('../config/connectRedis.js')

class FeatureRedis{
    async connectRedis(){
        try{
            client.connect(function(){
                console.log("redis is connected")
                return 1
            });
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async disConnectRedis(){
        try{
            await client.disconnect();
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async setRedis(key,value){
        try{
            const result = await client.set(key,value);
            return result
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async getRedis(key){
        try{
            const result = await client.get(key);
            return result
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async incrBy(key,value){
        try{
            const result = await client.incrBy(key,value);
            return result
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async delRedis(key){
        try{
            const result = await client.del(key);
            return result
        }catch(err){
            console.log(err)
            return 0;
        }
    }
    async setNxRedis(key,value){
        try{
            const result = await client.setnx(key,value);
            return result
        }catch(err){
            console.log(err)
            return 0;
        }
    }
}

module.exports = new FeatureRedis();