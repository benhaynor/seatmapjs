/** @type {number} */
var NUM_SEATS = 70;
/** @type {number} */
var NUM_FIRST_CLASS_ROWS = 5;
/** @type {Array.<string>} */
var SEATS = ['a', 'b', 'c', 'd'];

/**
 * This class represents an individual seat in a seat map, reflecting whether it is occupied or not
 * and enabling the user to add a passenger to the seat. A seat map only have one passenger and once
 * the passenger is set, cannot be removed.
 * @param {Element} element The DOM element in which this Seat is rendered.
 * @param {string} seatLetter The seat letter of this seat, one of 'a', 'b', 'c', or 'd'.
 * @constructor
 */
function Seat(element, seatLetter, rowNumber) {
	this.rowNumber = rowNumber;
	this.ticketClass = rowNumberToServiceClass(rowNumber);
	this.element = element;
	this.seatLetter = seatLetter;
	this.element.id = this.rowNumber + this.seatLetter;
	this.occupied = false;
	this.passenger = "";
	this.updateClass_();
	this.setupClickListener_();
}

/**
 * Sets up the click listener for selecting a seat. If the seat is occupied, an alert is fired with
 * the name of the occupying passenger. If the seat is not occupied, the user is prompted for the
 * name of a passenger.
 */
Seat.prototype.setupClickListener_ = function() {
	// When referring to the seat inside the event handler, use "me" instead of "this".
	var me = this;
	me.element.onclick = function(){ 
		if(me.passenger==""){
			me.passenger = prompt("What is your name?");
			me.occupied = true;
			me.updateClass_();
		} else {
			alert(me.passenger + " is already sitting in this seat.");
		}
	}
};

/**
 * Updates the element's classes to reflect the state of this seat.
 */
Seat.prototype.updateClass_ = function() {
	// The seat's className property should be set to 'seat' plus the letter of the seat, e.g.
	// 'seat a', 'seat b', 'seat c', or 'seat d'. Additionally, if a seat is occupied, then it
	// should also contain the word 'occupied'.
	this.element.className = "seat " + this.seatLetter + " " + this.ticketClass + " " + (this.occupied ? "occupied": ""); 
};


/**
 * Converts an index into the seat array and returns the corresponding letter.
 * @param {number} i Seat map index.
 * @return {string} The seat letter 
 */
function indexToSeatLetter(i) {
	return SEATS[i];
}

/**
 * Converts a row number to the service level.
 * @param {number} The row number.
 * @return {string} The service class, either 'firstClass' or 'economyClass'.
 */
function rowNumberToServiceClass(row) {
	return ((row >NUM_FIRST_CLASS_ROWS)? 'economyClass' : 'firstClass');
}

/**
 * Creates a new element of the specified type as a child of the specified container and returns it.
 * @param {string} type The type of the new element.
 * @param {Element} container The parent of the new element.
 * @return {Element} The newly created element.
 */
function createElement(type, container) {
	var newElement = document.createElement(type);
	container.appendChild(newElement);
	return newElement;
}

/**
 * Add a new row to the table and return. A row has one cell by default that contains the row
 * row number.
 * @param {number} rowNumber The number of the row.
 * @param {Element} container The table element which will contain the row.
 * @return {Element} The row element.
 */
function Row(rowNumber, container) {
	
	this.row = createElement("div",container);
	this.row.className += "row";
	var seatNumber = createElement("div",this.row);
	seatNumber.innerHTML = rowNumber;
	seatNumber.className += "rowNumber";
	this.seats = [];
	for (var i = 0; i <= 3; i ++){
		if (rowNumber == 18 && i == 2){
			break;
		}
		var seatNode = createElement('div', this.row);
		var seatObj = new Seat(seatNode,SEATS[i],rowNumber);
		this.seats.push(seatObj);
		if (rowNumber == 18 && i == 2){
			break;
		}
	}
}

Airplane.prototype.tojson = function(){
	json = [];
	for(var i in this.rows){
		passengers = [];
		seats = this.rows[i].seats; 
		for (var j in seats){
			passengers.push(seats[j].passenger);
		}
		json.push(passengers);
	}
	return json;
}

function Airplane(){
 	var seatMap = document.getElementById("seatmap");
	this.rows = [];
	for (var i = 1; i <= 5; i ++){
		this.rows.push(new Row(i,seatMap));
	}
	for (var i = 6; i <= 18; i ++){
		this.rows.push(new Row(i,seatMap));
	}
	// Rows and seats are represented with DIV elements.   
}

function fly(){
	$.getJSON('/checker',
			{'airplane':JSON.stringify(airplane.tojson())},
			function(data){
				window.console.log(data);
			}
	);	
	
//	$.post('/checker',{
//		data:{'airplane':airplane.tojson()},
//		success: function(data){
//			window.console.log(data);
//			alert('success!');
//			window.response=data;
//		},
//		datatype:"jsonp"
//	});
}

function init() {
	window.airplane = new Airplane();
}

