import { calcDaysInMonth, calcMonthOffset } from './utils/calendarGeneration.js'
/**
 * This class is responsible for creating a calendar that shows all the days of the current month with their
 * specific events displayed.
*/
export default class CalendarGenerator {
	#eventFiller;
	#calendar;

	constructor(eventFiller, calendarModel) {
		this.#eventFiller = eventFiller;
		this.#calendar = calendarModel;
	}

	/**
	 * Will first populate the div with the given 'id' with a grid filled with all the days of the
	 * current month. The containers representing the days are then filled with events taken from the 
	 * provided datasource.
	 * 
	 * @param {String} calendarId - div to create calendar in.
	 */
	createCalendar(calendarId) {
		this.#genDayTiles(calendarId);
		// this.#eventFiller.attachEvents(calendar);

	}

	/**
	 * Fills the calendar div with the given id with day tiles of the current month.
	 * @param {String} calendarId
	 */
	#genDayTiles(calendarId) {
		this.#genLeadingDays(calendarId);
		this.#genCurrentMonth(calendarId);
		this.#genTrailingDays(calendarId);
	}

	#genLeadingDays(calendarId) {
		const dayTileTemplate = document.querySelector('#singleDayTemplate');
		var calendar = document.getElementById(calendarId);
		const currentYear = this.#calendar.getYear();
		const currentMonth = this.#calendar.getMonth();
		const monthOffset = calcMonthOffset(currentYear, currentMonth);
		const daysInMonth = calcDaysInMonth(currentYear, currentMonth);
		
		for(var i = daysInMonth-monthOffset; i < daysInMonth+1; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.querySelector('#dayTile')

			var dayNumb = dayTile.querySelector('#dayNumb');
			dayNumb.innerText = i+1;
			dayTile.id = `${i+1}-${currentMonth-1}-${currentYear}`;

			dayNumb.classList.add('adjacentMonth');

			calendar.appendChild(dayTile);
		}
	}

	#genCurrentMonth(calendarId) {
		const currentYear = this.#calendar.getYear();
		const currentMonth = this.#calendar.getMonth();
		const daysInMonth = calcDaysInMonth(currentYear, currentMonth);
		const dayTileTemplate = document.querySelector('#singleDayTemplate');
		var calendar = document.getElementById(calendarId);

		for(var i = 0; i < daysInMonth; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.querySelector('#dayTile')

			var dayNumb = dayTile.querySelector('#dayNumb');
			dayNumb.innerText = i+1;
			dayTile.id = `${i+1}-${currentMonth}-${currentYear}`;

			if(i+1 === this.#calendar.getToday()) {
				let dayNumbWrapper = dayTile.querySelector('#dayNumbWrapper');
				dayNumbWrapper.classList.add('today');
			}

			calendar.appendChild(dayTile);
		}
	}

	#genTrailingDays(calendarId) {
		const dayTileTemplate = document.querySelector('#singleDayTemplate');
		var calendar = document.getElementById(calendarId);
		const currentYear = this.#calendar.getYear();
		const currentMonth = this.#calendar.getMonth();
		const monthOffset = calcMonthOffset(currentYear, currentMonth+1);
		const daysInWeek = 7;

		for(var i = 1; i < daysInWeek-monthOffset; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.querySelector('#dayTile')

			var dayNumb = dayTile.querySelector('#dayNumb');
			dayNumb.innerText = i;
			dayTile.id = `${i}-${currentMonth+1}-${currentYear}`;

			dayNumb.classList.add('adjacentMonth');

			calendar.appendChild(dayTile);
		}
	}
}