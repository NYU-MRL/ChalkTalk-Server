/*
TUIO and touch event generator
Omer Shapira, http://omershapira.com
MIT License
*/

var ongoingTouches = [];

var attachEvents = function(socket, target){
	socket.on("tap", handleTap);
	socket.on("tuio 1.0", handleTuio);
	socket.on("touch", handleTouch);

	function handleTap(msg){
		var evt = new MouseEvent("click", {
	    canBubble: false,
	    cancelable: true,
	    //TODO: check if this is necessary
	    view: window,
	  });
		target.dispatchEvent(evt);
	}

	function handleTouch(msg){
		var targetArray = touch_options.toMouse ? ongoingMice : ongoingTouches;

	}

	var tuio_re = new RegExp("\/tuio\/[\w+?]");

	function handleTuio(msg){
		//TODO: Implement
	}


}