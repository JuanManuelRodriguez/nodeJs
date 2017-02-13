/**
 * Created by juanma on 10/02/17.
 */
var express=require("express");

var app= express();

app.set("view engine","jade");
app.get("/",function (req,res) {
    res.render("index",{hola: "Hola Juan"});
});
app.listen(8080);