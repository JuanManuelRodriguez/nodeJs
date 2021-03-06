/**
 * Created by juanma on 13/02/17.
 */
var express=require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();
var fs = require("fs");
var redis = require("redis");

var client = redis.createClient();

var image_finder_middleware = require("./middlewares/find_image");

// app.com/app/
router.get("/", function (req, res) {
    Imagen.find({})
        .populate("creator")
        .exec(function (err,imagenes) {
           if (err) console.log(err);
            res.render("app/home",{imagenes:imagenes})

        });
});

/* REST */
/* CRUD */
router.get("/imagenes/new",function (req,res) {
    res.render("app/imagenes/new")
});

router.all("/imagenes/:id*",image_finder_middleware);

router.get("/imagenes/:id/edit",function (req,res) {
    res.render("app/imagenes/edit");
});

//imagen del usuario
router.route("/imagenes/:id")
    .get(function (req,res) {
        res.render("app/imagenes/show");
    })
    .put(function (req,res) {
        res.locals.imagen.title = req.fields.title;
        res.locals.imagen.save(function (err) {
            if(!err){
                res.render("app/imagenes/show")
            }else{
                res.render("app/imagenes/"+req.params.id+"/edit")
            }
        });
    })
    .delete(function (req,res) {
        Imagen.findOneAndRemove({_id:req.params.id},function (err) {
            if(!err){
                res.redirect("/app/imagenes");
            }else{
                console.log(err);
                res.redirect("/app/imagenes/"+req.params.id);
            }
        })
    });

//coleccion de imagenes
router.route("/imagenes")
    .get(function (req,res) {
        Imagen.find({creator:res.locals.user._id},function (err,imagenes) { //solo muestra las imagenes creadas por el usuario legueado
            if(err){
                res.redirect("/app");
                return;
            }
            res.render("app/imagenes/index",{imagenes: imagenes});
        });
    })
    .put(function (req,res) {

    })
    .post(function (req,res) {
        var extension = req.files.archivo.name.split(".").pop();
        console.log(extension);
        var data = {
            title: req.fields.title,
            creator: res.locals.user._id,
            extension:extension
        };
        var imagen = new Imagen(data);
        imagen.save(function (err) {
            if(!err){

                var imgJSON = {
                    "id":imagen._id,
                    "title": imagen.title,
                    "extension":imagen.extension
                };

                client.publish("images",JSON.stringify(imgJSON));
                fs.rename(req.files.archivo.path,"public/images/"+imagen._id+"."+extension);
                res.redirect("/app/imagenes/"+imagen._id);
            }
            else{
                console.log(imagen);
                res.render(err);
            }
        })
    });

module.exports = router;