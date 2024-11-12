/**
 * This class is responsible for creating a calendar that shows all the days of the current month with their
 * specific events displayed.
 */
class CalendarGenerator {

	#eventFiller;
	#currentDay;
	#currentMonth;
	#currentYear;

	constructor(eventFiller) {
		this.#eventFiller = eventFiller;

		let currentDate = new Date(Date.now());
		this.#currentDay = currentDate.getDay();
		this.#currentMonth = currentDate.getMonth();
		this.#currentYear = currentDate.getFullYear();
	}

	/**
	 * Will first populate the div with the given 'id' with a grid filled with all the days of the
	 * current month. The containers representing the days are then filled with events taken from the 
	 * provided datasource.
	 * 
	 * @param {String} id - div to create calendar in.
	 */
	createCalendar(calendar) {
		this.#fillDays(calendar);
		this.#eventFiller.attachEvents(calendar);
	}

	/**
	 * Fills the given calendar div with days of the current month.
	 * @param {HTMLDivElement} calendar 
	 */
	#fillDays(calendar) {
		//TODO: create divs per day of month.
	}

}