var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var outputNodes = [];
var inputNodes = [];
var _DEBUG = true;

var app_options = {
	port: 80
};

////////////////////////////SOCKET//////////////////////////

io.on('connection', function(client){

	client.on('type', 
		function(type){
			console.log("user connected: " + type + " # " + client.id);
			switch (type){
				case 'touch': {
					inputNodes.push(client);
					break;
				}
				default: {
					outputNodes.push(client);
					break;
				}
			}
		});

	function setID(){
		var shortID = getShortID(client.id);
		client.emit("set id", shortID);
	}

	client.on("tuio 1.0", 
		function (msg){
			broadcast(outputNodes, "tuio 1.0", msg);
			if (_DEBUG) {console.log(msg);}
		}
	);	

	client.on("touch",
		function(msg){
			if (_DEBUG){
				console.log(JSON.stringify(msg));
			}
		}
		);

	client.on("tap", 
		function (msg){
			if (_DEBUG) {console.log("tap : " + JSON.stringify(msg));}
		}
	);

	// client.on("")	

	client.on("disconnect",
		function (){
			if (debug) {console.log("user disconnected");}
		}
		);
});

/////////////////////////SERVER///////////////////////////

if ((process.argv.length > 2) && (typeof process.argv[2] === 'number')){
	app_options.port = parseInt(process.argv[2]);
}

app.get('/touch', function(req, res){
  res.sendfile('phone.html');
});

app.get('/', function(req,res){
	res.sendfile('main.html');
});

http.listen(app_options.port, function(){
  console.log('listening on *:' + app_options.port);
});

//////////////////////////HELPERS////////////////////////////

var getShortID = (function(){
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
	
function broadcast (list, header, message){
	list.forEach(
		function(x){
			x.emit(header, message);
			}
		);
}