    var http = require('http'),
        fs = require("fs");

    http.createServer(function(req,res){
        fs.readFile("index.html",function(err,html){
            res.writeHead(200,{'Content-Type':"application/html"});
            res.write(JSON.stringify({nombre:"Juan", username:"Juanma"}));
            res.end();
        });

    }).listen(8080);