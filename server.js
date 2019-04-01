var app = require('express')();
var http = require('http');
var server = http.createServer(app);
 


var path = __dirname;


// ----------- EXPRESS -------------

// index.html page providing
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/web/index.html');
  });

  app.get('/:page', function (req, res) {
    res.sendFile(__dirname+'/web/'+req.params.page+".html");
  });
  
  app.get('/css/:style', function (req, res) {
    res.sendFile(__dirname+'/css/'+req.params.style+".css");
  });
  
  app.get('/img/:image', function (req, res) {
    res.sendFile(__dirname+'/img/'+req.params.image+".png");
  });
  
  app.get('/js/:script', function (req, res) {
    res.sendFile(__dirname+'/js/'+req.params.script+".js");
  });


server.listen(process.env.PORT || 8080);

