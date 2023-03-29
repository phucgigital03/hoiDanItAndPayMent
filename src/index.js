const { app,io,server } = require('./config/configSocketIo.js')
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
const cors = require('cors')

const viewEngine = require('./config/viewEngine')
const routes = require('./routes/index.js')
const connectMongoDb = require('./config/dbMongoDb.js')
const corsOptions = require('./config/allowCors.js');
const hostName = require('./middlewares/hostNameMiddleWare.js');
const commentSocketIo = require('./services/commentSocketIo.js');
const { client } = require('./config/connectRedis.js')

const port = process.env.PORT || 8080
const hostname = process.env.HOST_NAME

// set cors
app.use(cors(corsOptions));

// config temple engine
viewEngine(app)

// config parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// addHostName
app.use(hostName)
// use route
routes(app);

// test socketIo
global._io = io;
io.on("connection",commentSocketIo.connectSocketIo);

// handleConnectAndStartServer
(async ()=>{
    try{
      const result = await connectMongoDb();
      if(!result){
        server.listen(port, hostname, () => {
          console.log(`backend app listening on port ${port}`)
        })
      }
    }catch(err){
      console.log(err)
    }
})();

