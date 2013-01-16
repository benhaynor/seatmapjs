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
 * @param {Node} element The DOM element in which this Seat is rendered.
 * @param {string} seatLetter The seat letter of this seat, one of 'a', 'b', 'c', or 'd'.
 * @constructor
 */
function Seat(element, seatLetter) {
}

/**
 * Sets up the click listener for selecting a seat. If the seat is occupied, an alert is fired with
 * the name of the occupying passenger. If the seat is not occupied, the user is prompted for the
 * name of a passenger.
 */
Seat.prototype.setupClickListener_ = function() {
	// When referring to the seat inside the event handler, use "me" instead of "this".
	var me = this;
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
 * @param {Node} container The parent of the new element.
 * @return {Node} The newly created element.
 */
function createElement(type, container) {
}

/**
 * Add a new row to the table and return. A row has one cell by default that contains the row
 * row number.
 * @param {number} rowNumber The number of the row.
 * @param {Node} container The table element which will contain the row.
 * @return {Node} The row element.
 */
function addRow(rowNumber, container) {
	 // A row should have the class name 'row' as well as its service class. The row number should
	 // have the class name 'rowNumber'.
}

/**
 * Once the body loads, a seat map is drawn by adding rows and seats.
 */
function init() {
	// Rows and seats are represented with DIV elements.
}
