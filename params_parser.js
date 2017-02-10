/**
 * Created by juanma on 10/02/17.
 */
function parse(req){
    var arreglo_parametros=[],
        parametros={};
    if(req.url.indexOf("?") > 0){
        // http://localhost:8080/?nombre=Juan => ['/','nombre=Juan&data=algo']
        var url_data=req.url.split("?");
        arreglo_parametros=url_data[1].split("&");
        //[nombre=Juan,data=algo]
    }

    for(var i=0;i<arreglo_parametros.length;i++){
        var parametro=arreglo_parametros[i];
        //nombre=Juan
        var param_data=parametro.split("=");
        //[nombre,Juan]
        parametros[param_data[0]]=param_data[1];
        //{nombre:Juan}
    }
    
    return parametros;
}

module.exports.parse=parse;