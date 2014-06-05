var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/touch', function(req, res){
  res.sendfile('phone.html');
});

app.get('/', function(req,res){
	res.send("<h1> not active </h1>");
})


io.on('connection', function(client){
	
	console.log("user connected: " + client.id);
	client.emit("set id", client.id);


	client.on("tuio 1.0", 
		function (msg){
			console.log(msg);
		}
	);

	client.on("disconnnect",
		function (){
			console.log("user disconnected");
		}
		);
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});