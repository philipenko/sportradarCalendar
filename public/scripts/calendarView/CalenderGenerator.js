import { calcDaysInMonth, calcMonthOffset } from '../utils/calendarGeneration.js';
/**
 * This class is responsible for creating a calendar that shows all the days of the current month with their
 * specific events displayed.
*/
export default class CalendarGenerator {
	#eventProvider;
	#calendarModel;
	#eventCntrl;
	#calendarId;

	constructor(eventProvider, calendarModel, eventCntrl, calendarId) {
		this.#eventProvider = eventProvider;
		this.#calendarModel = calendarModel;
		this.#eventCntrl = eventCntrl;
		this.#calendarId = calendarId;
	}

	/**
	 * Will fill the div with the given 'calendarId' with a grid filled with all the days of the
	 * current month and also, if an offset for the first day of the current month exists,
	 * will fill the div with the last days of the previous month and the first days of the
	 * following month, to completely fill up the whole grid.   
	 * The containers representing the 
	 * days are then filled with events taken from the provided datasource.
	 * 
	 */
	createCalendar() {
		this.#clearCalendar();
		this.#genDayTiles();
		this.#populateEvents();
	}

	/**
	 * Will clear all the data in the calendar container to make way for a new render.
	 */
	#clearCalendar() {
		const calendar = document.getElementById(this.#calendarId);
		
		calendar.innerHTML = '';
	}

	/**
	 * Fills the calendar div with the given id first, if necessary, with day tiles of the month before the selcted one, 
	 * then always with the day tiles of the actually selected ones and then, again if necessary, with the day tiles of 
	 * the folowing month.
	 */
	#genDayTiles() {
		this.#genLeadingDays();
		this.#genCurrentMonth();
		this.#genTrailingDays();
	}

	/**
	 * Will add the last days of the previous month do the div container with
	 * id of the provided 'calendarId'. 
	 */
	#genLeadingDays() {
		const dayTileTemplate = document.querySelector('#singleDayTemplate');
		var calendar = document.getElementById(this.#calendarId);
		const currentYear = this.#calendarModel.getCurrentYear();
		const currentMonth = this.#calendarModel.getCurrentMonth(); 
		const monthOffset = calcMonthOffset(currentYear, currentMonth-1);
		const daysInMonth = calcDaysInMonth(currentYear, currentMonth-1);
		
		for(var i = daysInMonth-monthOffset; i < daysInMonth; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.querySelector('#dayTile')

			var dayNumb = dayTile.querySelector('#dayNumb');
			dayNumb.innerText = i+1;
			dayTile.id = `${i+1}-${currentMonth-1}-${currentYear}`;

			dayNumb.classList.add('adjacentMonth');

			calendar.appendChild(dayTile);
		}
	}

	/**
	 * Will add all the days of the current month to the div with the given 'calendarId'.
	 */
	#genCurrentMonth() {
		const currentYear = this.#calendarModel.getCurrentYear();
		const currentMonth = this.#calendarModel.getCurrentMonth(); 
		const daysInMonth = calcDaysInMonth(currentYear, currentMonth);
		const dayTileTemplate = document.querySelector('#singleDayTemplate');
		var calendar = document.getElementById(this.#calendarId);

		for(var i = 1; i <= daysInMonth; ++i) {
			var dayTileClone = dayTileTemplate.content.cloneNode(true);
			var dayTile = dayTileClone.querySelector('#dayTile')

			var dayNumb = dayTile.querySelector('#dayNumb');
			dayNumb.innerText = i;
			dayTile.id = `${i}-${currentMonth}-${currentYear}`;

			if(i === this.#calendarModel.getToday()) {
				dayNumb.classList.add('today');
			}

			calendar.appendChild(dayTile);
		}
	}

	/**
	 * Will add the first days of the following month to fill up the whole grid, if
	 * necessary.
	 */
	#genTrailingDays() {
		var calendar = document.getElementById(this.#calendarId);
		const CALENDAR_WIDTH = 7;
		const CALENDAR_HEIGHT = 5;

		if(calendar.children.length < CALENDAR_HEIGHT*CALENDAR_WIDTH) {

			const dayTileTemplate = document.querySelector('#singleDayTemplate');
			const currentYear = this.#calendarModel.getCurrentYear();
			const currentMonth = this.#calendarModel.getCurrentMonth(); 
			const monthOffset = calcMonthOffset(currentYear, currentMonth);
			const daysInWeek = 7;
	
			for(var i = 1; i <= daysInWeek-monthOffset; ++i) {
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

	/**
	 * Will add events to every dayTile that matches the date of the event.
	 */
	#populateEvents() {
		const eventTemplate = document.querySelector('#eventTemplate');
		var calendar = document.getElementById(this.#calendarId);
		var days = calendar.children;
		const events = this.#calendarModel.getEvents();

		for(const eventIndex in events) {
			const event = events[eventIndex]
			const eventDate = event.getDate();
			
			for(const dayIndex in days) {
				var day = days[dayIndex]
				const eventDateStr = `${eventDate.day}-${eventDate.month}-${eventDate.year}`;

				if(day.id === eventDateStr) {
					var eventClone = eventTemplate.content.cloneNode(true);
					var eventContainer = eventClone.querySelector('#eventContainer')
					var homeTeam = eventContainer.querySelector('#homeTeam');
					var awayTeam = eventContainer.querySelector('#awayTeam');
				
					homeTeam.innerText = `${event.getHomeTeamAbr()} `;
					awayTeam.innerText = ` ${event.getAwayTeamAbr()}`;

					eventContainer.id = event.id;
					eventContainer.addEventListener('click', this.#eventCntrl.showEventDetails, eventContainer.id);
					this.#eventCntrl.tryHidingEventNames(eventContainer);

					var eventsList = day.querySelector('.eventsList');

					eventsList.appendChild(eventContainer);
					
					break;
				}
			}
		}
	}
}