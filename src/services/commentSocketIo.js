
class CommentSocketIo{
    connectSocketIo(socket){
        console.log("client conected: ",socket.id);
        socket.on("disconnect",()=>{
            console.log("client disconected: ",socket.id)
        })
        socket.on("join-blog",(nameRoom)=>{
            if(!socket.Room){
                socket.Room = nameRoom;
                socket.join(nameRoom);
            }else{
                socket.leave(socket.Room);
                socket.Room = nameRoom;
                socket.join(nameRoom);
            }
        });
        socket.on("post-comment",(commentPost)=>{
            _io.sockets.in(socket.Room).emit("render-post-comment",commentPost)
        });
        socket.on("reply-comment",(...argData)=>{
            _io.sockets.in(socket.Room).emit("render-reply-comment",...argData)
        });
    }
}

module.exports = new CommentSocketIo();