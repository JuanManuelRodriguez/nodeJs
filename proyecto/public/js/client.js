/**
 * Created by juanma on 15/02/17.
 */
var socket = io();

socket.on("new image",function (data) {
    dato= JSON.parse(data);
    console.log(dato);
    var container= document.querySelector("#imagenes");
    var source = document.querySelector("#image-template").innerHTML;
    var template = Handlebars.compile(source);

    container.innerHTML= template(dato)+container.innerHTML;
});