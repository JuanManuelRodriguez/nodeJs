/**
 * Created by juanma on 14/02/17.
 */
var Imagen = require("../models/imagenes"),
    owner_check = require("./image_permission");

module.exports= function (req,res,next) {
  Imagen.findById(req.params.id)
      .populate("creator")
      .exec(function (err,imagen) {
      if(imagen != null && owner_check(imagen,req,res)){
          res.locals.imagen = imagen;
          next();
      }else{
          res.redirect("/app");
      }
  })
};