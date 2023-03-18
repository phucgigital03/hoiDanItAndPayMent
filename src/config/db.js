const mysql = require('mysql2/promise');
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_ROOT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

module.exports = connection
  