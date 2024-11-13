//import {daysInMonth} from './utils/calendarGeneration.js'
/**
 * This class is responsible for creating a calendar that shows all the days of the current month with their
 * specific events displayed.
*/
export default class CalendarGenerator {

	#eventFiller;
	#calendarModel
	#currentDay;
	#currentMonth;
	#currentYear;

	constructor(eventFiller, calendarModel) {
		this.#eventFiller = eventFiller;
		this.#calendarModel = calendarModel;

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
		this.#generateDayTiles();
		// this.#eventFiller.attachEvents(calendar);

	}

	/**
	 * Fills the given calendar div with days of the current month.
	 * @param {HTMLDivElement} calendar 
	 */
	#generateDayTiles() {
		const dayTileTemplate = document.querySelector('singleDayTemplate');
		const daysInMonth = this.#daysInMonth(this.#currentYear, this.#currentMonth);
		var calendar = document.getElementById('calendarContainer');
		
		for(var i = 0; i < daysInMonth; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.getElementsByClass('.dayTile')

			var dayNumb = dayTile.getElementsByClass('.dayNumb');
			dayNumb[0].innerText = i+1;
			dayTile[0].id = `${this.#currentDay}-${this.#currentMonth}-${this.#currentYear}`;

			calendar.appendChild(dayTile);
		}

	}

	#daysInMonth(year, month) {
		return new Date(year, month+1, 0).getDate();
	}
}