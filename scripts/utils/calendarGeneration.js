export function calcDaysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

/**
 * Will return an offset for the provided month by checking the weekday of the last day of the given month,
 * where Sunday = 0 and Saturday = 6.
 * @param {Number} year 
 * @param {Number} month 
 * @returns the index of the weekday of the last month. 
 */
export function calcMonthOffset(year, month) {
	var weekDay = new Date(year, month, 0).getDay(); // 0 to 6, Sunday is 0 and 6 is saturday
	return weekDay;
}

/**
 * This function splits the given string into year, month and day
 * and returns an array. The provided string has to have the syntax:
 * 'YEAR-MONTH-DAY'
 * @param {String} dateString 
 */
export function parseEventDate(dateString) {
	let splitDate = dateString.split("-");
	return splitDate;
}
