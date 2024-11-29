import { monthNames } from "../utils/calendarNav.js";

export default class CalendarController {
	#calendarGen;
	#calendarModel;

	constructor(calendarGen, calendarModel) {
		this.#calendarGen = calendarGen;
		this.#calendarModel = calendarModel;
		this.#addListeners();
	}

	#addListeners() {
		const prevMonthBttnId = 'prevMonthBtn';
		const nextMonthBttnId = 'nextMonthBtn';
		const PREV_MONTH = -2; // CalendarModel adds +1 to its month var.
		const NEXT_MONTH = 0;  // CalendarModel adds +1 to its month var.

		this.#addBttnListener(prevMonthBttnId, PREV_MONTH);
		this.#addBttnListener(nextMonthBttnId, NEXT_MONTH);
		this.#addCloseDetailsListener();
	}

	#addBttnListener(changeMonthBtnId, CHANGE_DIRECTION) {
		const changeMonthBttn = document.getElementById(changeMonthBtnId);

		changeMonthBttn.addEventListener('click', (event) => {

			const day = this.#calendarModel.getToday();
			var month = this.#calendarModel.getCurrentMonth() + CHANGE_DIRECTION;
			var year = this.#calendarModel.getCurrentYear();

			if(month === 12) {
				year++;
				month = 0;
				this.#changeYearDisplay(year);
			}

			if(month === -1) {
				year--;
				month = 11;
				this.#changeYearDisplay(year);
			}

			const newDate = new Date(year, month, day);

			this.#changeMonthDisplay(month);
			this.#calendarModel.setNewDate(newDate);
			this.#calendarGen.createCalendar();
		});
	}

	#changeMonthDisplay(month) {
		const displayId = 'currentMonth';

		var monthDisplay = document.getElementById(displayId);

		monthDisplay.innerHTML = monthNames[month];
	}

	#changeYearDisplay(year) {
		const displayId = 'currentYear';

		var yearDisplay = document.getElementById(displayId);

		yearDisplay.innerHTML = year;
	}

	#addCloseDetailsListener() {
		const closeDetailsId = 'closeDetails';
		const eventDetailsId = 'eventDetails';
		
		const closeBttn = document.getElementById(closeDetailsId);
		const eventDetails = document.getElementById(eventDetailsId);

		closeBttn.addEventListener('click', (event) => {
			eventDetails.style.display = 'none';
		})
	}
}