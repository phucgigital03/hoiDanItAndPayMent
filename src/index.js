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
let arrUserName = [];
io.on("connection",(socket)=>{
  let arrNameRoom = []

  console.log("client connect: ",socket.id)
  socket.on("disconnect",()=>{
    console.log("client disconnect: ",socket.id);
    arrUserName = arrUserName.filter((userName)=> userName !== socket.userName)
    io.sockets.emit("sever-send-listUser",arrUserName);
  })
  socket.on("client-send-userName",(userName)=>{
    socket.userName = userName
    console.log("client " + socket.id,socket.userName);
    if(arrUserName.includes(userName)){
        socket.emit("client-register-err","user ton tai");
    }else{
        arrUserName.push(userName);
        socket.emit("client-register-suc","create user success");
        io.sockets.emit("sever-send-listUser",arrUserName);
        const rooms  = io.sockets.adapter.rooms;
        if (rooms) {
          for (let [key, value] of rooms.entries()) {
              if(!arrNameRoom.includes(key)){
                arrNameRoom.push(key)
              }
          }
        }
        io.sockets.emit("sever-send-listRoom",arrNameRoom);
    }
  })
  socket.on("client-send-message",(message)=>{
      if(message){
        io.sockets.emit("server-send-message",{
          name: socket.userName,
          message: message
        });
      }
  })
  socket.on("catch-event-focusIn",()=>{
    socket.broadcast.to(socket.Room).emit("another-user-forcusIn")
  })
  socket.on("catch-event-focusOut",()=>{
    socket.broadcast.to(socket.Room).emit("another-user-forcusOut")
  })

  socket.on("create-room",(nameRoom)=>{
    socket.join(nameRoom);
    socket.Room = nameRoom;
    if(!arrNameRoom.includes(nameRoom)){
      const rooms  = io.sockets.adapter.rooms;
        if (rooms) {
          for (let [key, value] of rooms.entries()) {
              if(!arrNameRoom.includes(key)){
                arrNameRoom.push(key)
              }
          }
      }
      socket.emit("create-room-suc",nameRoom);
      io.sockets.emit("send-list-room",arrNameRoom);
    }else{
      socket.emit("join-room",nameRoom);
    }
  })

  socket.on("send-message-room",(message)=>{
    if(message){
      io.sockets.in(socket.Room).emit("send-message-room-other-user",{
        name: socket.userName,
        message: message
      });
    }
  })
});

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

