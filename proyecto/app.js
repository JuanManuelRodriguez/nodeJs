/**
 * Created by juanma on 10/02/17.
 */
var express=require("express");
var bodyParser=require("body-parser");
var User = require("./models/user").User;
var app= express();

app.use("/public",express.static('public'));
app.use(bodyParser.json());//para peticiones  application/json
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","jade");

app.get("/",function (req,res) {
    res.render("index");
});

app.get("/signup",function (req,res) {
    User.find(function (err,doc) {
        console.log(doc);
        res.render("signup");

    });
});

app.get("/login",function (req,res) {
    res.render("login");
});

app.post("/users",function (req,res) {
    var user= new User({email: req.body.email,
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation,
                        username: req.body.username
    });
    user.save().then(function(us){
        res.send("Guardamos el usuario exitosamente");
    },function (err) {
        if(err){
            console.log(String(err));
            res.send("No pudimos Guardar tus datos");
        }

    });

});

app.post("/sessions",function (req,res) {
    User.findOne({email:req.body.email,password:req.body.password},"username email",function (err,docs) {
        console.log(docs);
        res.send("HOLA MUNDO");
    })
});


app.listen(8080);