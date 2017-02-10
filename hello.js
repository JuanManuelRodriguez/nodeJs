/**
 * Created by juanma on 09/02/17.
 */
var http = require('http');
var hand = function(req,res){
    console.log("Recibimos una nueva peticion");
    res.end("Hola mundo");
};
var server = http.createServer(hand);
server.listen(8080);

