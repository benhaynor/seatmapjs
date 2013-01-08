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
function Seat(element, seatLetter) {
	this.element = element;
	this.seatLetter = seatLetter;
	this.occupied = false;
	this.passenger = "";
}

/**
 * Sets up the click listener for selecting a seat. If the seat is occupied, an alert is fired with
 * the name of the occupying passenger. If the seat is not occupied, the user is prompted for the
 * name of a passenger.
 */
Seat.prototype.setupClickListener_ = function() {
	// When referring to the seat inside the event handler, use "me" instead of "this".
	var me = this;
	alert("got me!");
};

/**
 * Updates the element's classes to reflect the state of this seat.
 */
Seat.prototype.updateClass_ = function() {
	// The seat's className property should be set to 'seat' plus the letter of the seat, e.g.
	// 'seat a', 'seat b', 'seat c', or 'seat d'. Additionally, if a seat is occupied, then it
	// should also contain the word 'occupied'.
};

/**
 * Converts an index into the seat array and returns the corresponding letter.
 * @param {number} i Seat map index.
 * @return {string} The seat letter 
 */
function indexToSeatLetter(i) {
}

/**
 * Converts a row number to the service level.
 * @param {number} The row number.
 * @return {string} The service class, either 'firstClass' or 'economyClass'.
 */
function rowNumberToServiceClass(row) {
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
function addRow(rowNumber, container) {
	
	var row = createElement("div",container);
	row.className += "row";
	var seatNumber = createElement("div",row);
	seatNumber.innerHTML = rowNumber;
	seatNumber.className += "rowNumber";
	for (var i = 1; i <= 4; i ++){
		var seat = createElement('input', row);
        seat.setAttribute("type","text");
		seat.className += "seat " + SEATS[i-1];
        seat.id = rowNumber+['a','b','c','d'][i-1];
		function handleClick(e) {
			if(e.srcElement.name==undefined){
				var passenger = prompt("What is your name?");
				e.srcElement.className += " occupied";
				e.srcElement.name = passenger;
			} else {
				alert(e.srcElement.name + " is already sitting in this seat.");
			}
		}
		seat.addEventListener('click',handleClick,false);
		if (rowNumber == 18 && i == 2){
			break;
		}
	}
}

function Airplane(){}

function init() {
	var seatMap = document.getElementById("seatmap");
	var firstClass = createElement("div",seatMap);
	firstClass.className += "firstClass";
	for (var i = 1; i <= 5; i ++){
		addRow(i,firstClass);
	}
	var economyClass = createElement("div",seatMap);
	economyClass.className += "economyClass";
	for (var i = 6; i <= 18; i ++){
		addRow(i,economyClass);
	}
	// Rows and seats are represented with DIV elements.
}
