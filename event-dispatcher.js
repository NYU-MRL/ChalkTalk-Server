/*
TUIO and touch event generator
Omer Shapira, http://omershapira.com
MIT License
*/

var ongoingTouches = {};

var forceMouseEvents = false;

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
			case "touchStart":{
				ongoingTouches.push(copyEvent(msg));
				var evt = new TouchEvent("touchstart")
				break;
			}
			case "touchMove":{
				var i = findEventIndexById(msg);
				if (i >= 0) {
					ongoingTouches.splice(i,1,copyEvent(msg));
				}
				break;
			}
			case "touchEnd":{
				var i = findEventIndexById(msg);
				if (i >= 0) {
					ongoingTouches.splice(i,1);
				}
				break;
			}
			default : break;
		}

	}

	var tuio_re = new RegExp("\/tuio\/[\w+?]");

	function handleTuio(msg){
		//TODO: Implement
	}

	function findEventIndexById(evt){
		for (var i = 0 ; i < ongoingTouches.length; i++){
			if (ongoingTouches[i].id === evt.id){
				return i;
			}
		}
		return -1;
	}

	function copyEvent(evt){
		var newEvt = {};
		['eventType', 'id', 'x', 'y'].foreach(
			function(x){ newEvt[x] = evt[x]; }
			);
		return newEvt;
	}

	function getViewport(){
				return {
					w : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					h : Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
				}
			}


}