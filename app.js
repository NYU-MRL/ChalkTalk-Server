var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  req.sendfile("index.html");
});

io.on('connection' function(socket){
	console.log("Someone connected");
	
	socket.on('disconnect' , function(){
		console.log('Disconnected');
	});

	socket.on('tuio 1.0' , function(){

	});

})

http.listen(3000, function(){
  console.log("listening on *:3000");
})
