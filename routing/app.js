/**
 * Created by juanma on 10/02/17.
 */
var express=require("express");

var app= express();

app.set("view engine","jade");

app.get("/",function (req,res) {
    res.render("index");
});
//se accede a la peticion mediante la url localhost:8080/formGET--- siempre y cuando el METHOD del form sea GET
app.get("/:nombre",function (req,res) {
    res.render("form",{nombreAMostrar:req.params.nombre});
});

app.post("/",function (req,res) {
   res.render("form");
});
app.listen(8080);