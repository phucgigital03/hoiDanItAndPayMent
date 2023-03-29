const Redis = require("ioredis")
const dotenv = require('dotenv')
dotenv.config()

const client = new Redis(process.env.URL_REDIS)

module.exports = {
    client: client
}
