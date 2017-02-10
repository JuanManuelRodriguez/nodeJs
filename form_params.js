var http = require('http'),
    fs = require("fs"),
    parser = require("./params_parser.js"),
    render = require("./render_view.js");

var p= parser.parse;
var r=render.render;
http.createServer(function(req,res){

    fs.readFile("index.html",function(err,html){
        var html_string = html.toString();
        var parametros= p(req);

        var nombre= "";

       
        res.writeHead(200,{'Content-Type':"text/html"});
        res.write(r(html_string,parametros));//res.write(html_string);
        res.end();
    });

}).listen(8080);

