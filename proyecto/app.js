/**
 * Created by juanma on 10/02/17.
 * 
 * 
 * Para que funcione la app hay que tener ejecutandose en 2 terminales distintas
 * redis-server y nodemon
 */ 
var express=require("express");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware= require("./middlewares/session");
var formidable = require("express-formidable");
var RedisStore = require("connect-redis")(session);
var http = require("http");
var realtime = require("./realtime");

var methodOverride = require("method-override");

var app= express();
var server = http.Server(app);

var sessionMiddleware = session({// no tiene nada que ver con session_middleware
    store:new RedisStore({}),
    secret:"ultra secret",
    resave: false,
    saveUninitialized:false
});

realtime(server,sessionMiddleware);

app.use("/public",express.static('public'));

app.use(methodOverride("_method"));

app.use(sessionMiddleware);

app.use(formidable({ keepExtensions:true })) ;//{} carpeta temporal donde se guardaran las imagenes

app.set("view engine","jade");

app.get("/",function (req,res) {
    //console.log(req.session.user_id);
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
    var user= new User({email: req.fields.email,
                        password: req.fields.password,
                        password_confirmation: req.fields.password_confirmation,
                        username: req.fields.username
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
    User.findOne({email:req.fields.email,password:req.fields.password},function (err,user) {
        req.session.user_id = user._id;
        res.redirect("/app");
    })
});

app.use("/app",session_middleware);
app.use("/app",router_app);

server.listen(8081);