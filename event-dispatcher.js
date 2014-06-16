/*
TUIO and touch event generator
Omer Shapira, http://omershapira.com
MIT License
*/

var ongoingTouches = {};

var attachEvents = function(socket, target){
	socket.on("tap", handleTap);
	socket.on("tuio 1.0", handleTuio);
	socket.on("touch", handleTouch);

	function handleTap(msg){
		var viewport = getViewport();
		var evt = new MouseEvent("click", {
	    canBubble: false,
	    cancelable: true,
	    //TODO: check if this is necessary
	    view: window,
	    clientX : msg.x * viewport.w,
	    clientY : msg.y * viewport.h
	  });
		target.dispatchEvent(evt);
		// console.log("clientX : " + msg.x * viewport.w + " | " + "clientY : "+msg.y * viewport.h);
	}

	function handleTouch(msg){
		//Compare messages
		switch (msg.eventType){
			case "touchBegin":{
				break;
			}
			case "touchMove":{
				break;
			}
			case "touchEnd":{
				break;
			}
		}

	}

	var tuio_re = new RegExp("\/tuio\/[\w+?]");

	function handleTuio(msg){
		//TODO: Implement
	}

	function getViewport(){
				return {
					w : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					h : Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
				}
			}


}