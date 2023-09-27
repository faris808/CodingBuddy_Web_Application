const express=require('express');
const socketio=require('socket.io');
const app=express();
const http=require('http');
const ACTIONS = require('./src/Actions');
const server=http.createServer(app);
const io=socketio(server);
const userSocketMap={};
function getAllConnectedClients(roomid){
    //map
    return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map((socketid)=>{
        return{
            socketid,
            username:userSocketMap[socketid],
        };
    });
}
const port=process.env.port || 5000;
io.on('connection',(socket)=>{
    console.log("socket connected",socket.id);
    socket.on(ACTIONS.JOIN,({roomid,username})=>{
        userSocketMap[socket.id]=username;
        socket.join(roomid);
        const clients=getAllConnectedClients(roomid);
        console.log(clients);
        clients.forEach(({socketid})=>{
            io.to(socketid).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketid:socket.id,
            });
        })
    })

    socket.on('disconnecting',()=>{
        const rooms=[...socket.rooms];
        rooms.forEach((roomid)=>{
            socket.in(roomid).emit(ACTIONS.DISCONNECTED,{
                socketid:socket.id,
                username:userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

server.listen(port,()=>{
    console.log(`server is listening on the port ${port}`);
})
