/**
 * Created by juanma on 13/02/17.
 */
var express=require("express");

var router = express.Router();

// app.com/app/
router.get("/", function (req, res) {
    /* Buscar el usuario */
    res.render("app/home")
});

/* REST */
router.get("/imagenes/new",function (req,res) {
    res.render("app/imagenes/new")
});

router.get("/imagenes/:id/edit",function (req,res) {

});

//imagen del usuario
router.route("/imagenes/:id")
    .get(function (req,res) {
        
    })
    .put(function (req,res) {
        
    })
    .delete(function (req,res) {
        
    });

//coleccion de imagenes
router.route("/imagenes")
    .get(function (req,res) {

    })
    .put(function (req,res) {

    })
    .post(function (req,res) {

    });

module.exports = router;