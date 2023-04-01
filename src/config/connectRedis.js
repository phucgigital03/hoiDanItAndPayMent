const Redis = require("ioredis")
const dotenv = require('dotenv')
dotenv.config()

const client = new Redis(process.env.URL_REDIS_LAB)
const clientSubscribe = new Redis(process.env.URL_REDIS_LAB);

client.on('connect', function() {
    console.log('Redis is connected!');
});

module.exports = {
    client: client,
    clientSubscribe: clientSubscribe
}
