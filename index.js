var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/touch', function(req, res){
  res.sendfile('phone.html');
});

app.get('/', function(req,res){
	res.send("<h1> Not Active </h1>");
})


io.on('connection', function(client){
	var shortID = getShortID(client.id);
	console.log("user connected: " + client.id + ", short ID: "+ shortID);
	client.emit("set id", shortID);


	client.on("tuio 1.0", 
		function (msg){
			console.log(msg);
		}
	);

	client.on("tap", 
		function (msg){
			console.log("tap : " + JSON.stringify(msg));
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

///////////////////////////////////////////////////////////////

getShortID = (function(){
	// https://gist.github.com/christopherhan/989041
	var ALPHABET = {'-': 62, '1': 53, '0': 52, '3': 55, '2': 54, '5': 57, '4': 56, '7': 59, '6': 58, '9': 61, '8': 60, 'A': 0, 'C': 2, 'B': 1, 'E': 4, 'D': 3, 'G': 6, 'F': 5, 'I': 8, 'H': 7, 'K': 10, 'J': 9, 'M': 12, 'L': 11, 'O': 14, 'N': 13, 'Q': 16, 'P': 15, 'S': 18, 'R': 17, 'U': 20, 'T': 19, 'W': 22, 'V': 21, 'Y': 24, 'X': 23, 'Z': 25, '_': 63, 'a': 26, 'c': 28, 'b': 27, 'e': 30, 'd': 29, 'g': 32, 'f': 31, 'i': 34, 'h': 33, 'k': 36, 'j': 35, 'm': 38, 'l': 37, 'o': 40, 'n': 39, 'q': 42, 'p': 41, 's': 44, 'r': 43, 'u': 46, 't': 45, 'w': 48, 'v': 47, 'y': 50, 'x': 49, 'z': 51};
 
	function decode(s) {
	    var n = 0;
	    for(var i=0; i < s.length; i++) {
	        var c = s.charAt(i);
	        n = n * 64 + ALPHABET[c];
	    }
	    return n;
	}

	var prime = 9973;
	
	function func(longID){
		return decode(longID) % prime;
	}

	return func;
})();
	
