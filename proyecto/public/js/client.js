/**
 * Created by juanma on 15/02/17.
 */
var socket = io();

socket.on("new image",function (data) {
    dato= JSON.parse(data);
    console.log(dato);
});