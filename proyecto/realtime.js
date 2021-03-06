/**
 * Created by juanma on 15/02/17.
 */
module.exports = function (server,sessionMiddleware) {
    var io= require("socket.io")(server);
    var redis = require("redis");
    var client = redis.createClient();

    client.subscribe("images");

    io.use(function (socket,next) {
       sessionMiddleware(socket.request,socket.request.res,next);
    });
    
    client.on("message",function (channel,message) {
       if(channel=="images"){
           io.emit("new image",message);//mensaje que se envia a todos
       }
    });
    
    io.sockets.on("connection",function (socket) {
        console.log(socket.request.session.user_id);
    });
};