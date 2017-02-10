var http = require('http'),
    fs = require("fs");

http.createServer(function(req,res){
    fs.readFile("index.html",function(err,html){
        var html_string = html.toString();
        //Expresion regular que busca en el HTML donde haya {x}
        var variables= html_string.match(/[^\{\}]+(?=\})/g);
        var nombre= "Juan";
        //variables ['nombre']
        for(var i=0;i<variables.length;i++) {
            //lo que ejecutamos como código de javaScript
            //Para obtener el valor de dicha variable
            var value=eval(variables[i]);
            //reemplazo el contenido de {x} por su valor corrspondiente
            html_string= html_string.replace("{"+variables[i]+"}",value);
        }
        //Se manda el contenido
        res.writeHead(200,{'Content-Type':"text/html"});
        res.write(html_string);
        res.end();
    });

}).listen(8080);
