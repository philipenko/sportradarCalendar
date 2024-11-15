export function calcDaysInMonth(year, month) {
	return new Date(year, month+1, 0).getDate();
}

export function calcMonthOffset(year, month) {
	return new Date(year, month, 0).getDay()-1;
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
