export function calcDaysInMonth(year, month) {
	return new Date(year, month+1, 0).getDate();
}

export function calcMonthOffset(year, month) {
	console.log(new Date(year, month, 0).getDay()-1)
	return new Date(year, month, 0).getDay()-1;
}
