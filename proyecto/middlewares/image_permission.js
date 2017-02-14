/**
 * Created by juanma on 14/02/17.
 */
var Imagen = require("../models/imagenes");

module.exports = function (image,req,res) {
    //TRUE = Tiene permisos
    //FALSE = si NO tiene permiso
    if(req.method === "GET" && req.path.indexOf("edit") < 0){
        //ver la imagen
        return true;
    }
    if(typeof image.creator == "undefined") return false;

    if(image.creator._id.toString() == res.locals.user._id){
        //imagen subida por el usuario loggeado en este momento
        return true;
    }
    return false;
};