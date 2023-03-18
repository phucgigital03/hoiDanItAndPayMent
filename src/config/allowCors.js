const whitelist = [
  'http://localhost:3000', 
  'http://localhost:5002',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = corsOptions
