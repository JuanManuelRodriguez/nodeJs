var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var img_schema = new Schema({
    title:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId, ref:"User"} //hace referencia al model user
});
var Imagen = mongoose.model("Imagen",img_schema);

module.exports = Imagen;