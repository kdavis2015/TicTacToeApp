// x is 0 -- o is 1
var xoro = 0;
var imagename = ""

document.addEventListener("deviceready",onDeviceReady,false);

// PhoneGap is ready to be used!
//
function onDeviceReady() {
	console.log(navigator.camera);
}

function resetBoard() {
	xoro = 0;
	// just doing squares 1, 4, and 7.
	// Should be a for loop with the 9 squares
	console.log("resetBoard...");
	for (var box = 1; box<10; box++) {
		var square = document.getElementById("box" + (box));
		square.src = "blank.png";
	}
	
}

function onSuccess(imageData) {
    image = document.getElementById(imagename);
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function getPicture(name) {

	imagename = name;
	console.log("getPicture name: " + imagename);
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.DATA_URL});

}

function playsquare(name) {
	var square = document.getElementById(name);
	var pos = square.src.lastIndexOf("blank",square.src)
	console.log("playsquare name: "+name+" square.src"+square.src+" pos: "+pos);
	if (pos > 0) {
		if (xoro == 1) {
			xoro = 0
			square.src = "o.png";
			console.log("O play");
		} else {
			xoro = 1
			square.src = "x.png";
			console.log("X play");
		}
	} else {
		console.log("not blank");
	}
}