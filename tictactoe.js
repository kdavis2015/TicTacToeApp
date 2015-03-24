// x is 0 -- o is 1
var xoro = 0;
var imagename = "";
var totalplays = 0;
var winner_tracking = [0,0,0,0,0,0,0,0,0];

document.addEventListener("deviceready",onDeviceReady,false);

// PhoneGap is ready to be used!
//
function onDeviceReady() {
	console.log(navigator.camera);
}

function resetBoard() {
	xoro = 0;
	totalplays = 0;
	winner_tracking = [0,0,0,0,0,0,0,0];
	// just doing squares 1, 4, and 7.
	// Should be a for loop with the 9 squares
	console.log("resetBoard...");
	for (var box = 1; box<10; box++) {
		var square = document.getElementById("box" + (box));
		square.src = "blank.png";
	}
	
}

function dowehaveaWinner() {

	var row = [0,0,0];
	var col = [0,0,0];
	var diag = [0,0];
	
	for (i = 0;i<3;i++) {
		row[i] = winner_tracking[0+(i*3)] + winner_tracking[1+(i*3)] + winner_tracking[2+(i*3)];
		col[i] = winner_tracking[(0+i)] + winner_tracking[(3+i)] + winner_tracking[(6+i)];
		
		console.log(" I: " + i + " row: " + row[i] + " col: " + col[i]);
	}
	
	
	diag[0] = winner_tracking[0] + winner_tracking[4] + winner_tracking[8];
	diag[1] = winner_tracking[2] + winner_tracking[4] + winner_tracking[6];
	
	console.log( "diag0: " + diag[0] + " diag1: " + diag[1]);
	
	
	
	if ((row[0] == 3) || (row[1] == 3) || (row[2] ==3) || (col[0] == 3) || (col[1] == 3) || 
		(col[2] == 3) || (diag[0] == 3) || (diag[1] == 3)) {
		return 1;
	}
	
	if ((row[0] == 12) || (row[1] == 12) || (row[2] == 12) || (col[0] == 12) || (col[1] == 12) || 
		(col[2] == 12) || (diag[0] == 12) || (diag[1] == 12)) {
		return 2;
	}
	
	return 0; 

}

function onSuccess(imageData) {
	console.log("processing picture: " +imagename);
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
	//var length = name.length;
	//var character = name.charAt(length-1);
	//var number = parseInt(character);
	var number = parseInt(name.charAt(name.length-1));
	console.log("playsquare name: "+name+" square.src"+square.src+" pos: "+pos+ " number: " + number);
	//console.log("length: " + length + " character: " + character + " number: " + number);
	
	if (pos > 0) {
		if (xoro == 1) {
			// This is the O side of the house
			winner_tracking[number-1] = 4;
			xoro = 0
			square.src = "o.png";
			console.log("O play");
			totalplays++;
		} else {
			// This is the X side of the house
			xoro = 1
			winner_tracking[number-1] = 1;
			square.src = "x.png";
			console.log("X play");
			totalplays++;
		}
	} else {
		console.log("not blank");
	}
	
	var winner = dowehaveaWinner(winner_tracking);
	
	if (winner == 1) {
		alert("X is the winner");
		navigate.vibrate(1000);
		resetBoard();
	} else if (winner == 2) {
		alert("O is the winner");
		navigate.vibrate(1000);
		resetBoard();
	} else {
		if (totalplays == 9) {
			alert("Tie game");
			navigate.vibrate(1000);
			resetBoard();
		}
	}
	
}