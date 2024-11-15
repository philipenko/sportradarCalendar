export default class Calendar {
	#events = [];
	// {
	// 	'2024': {
	// 		'1': [],
	// 		'2': [],
	// 		'3': [],
	// 		'4': [],
	// 		'5': [],
	// 		'6': [],
	// 		'7': [],
	// 		'8': [],
	// 		'9': [],
	// 		'10': [],
	// 		'11': [],
	// 		'12': [],
	// 	}
	// };
	#currentWeekDay;
	#currentDay;
	#currentMonth;
	#currentYear;

	constructor() {
		let currentDate = new Date(Date.now());
		this.#currentWeekDay = currentDate.getDay();
		this.#currentDay = currentDate.getDate();
		this.#currentMonth = currentDate.getMonth();
		this.#currentYear = currentDate.getFullYear();
	}
	
	/**
	 * Will add a single event to the given month pool of the given year.   
	 * It is important to note, that each event Object needs to be wrapped in another object that gives 
	 * this single event object an UID, such that this event can be modified or deleted in the future.
	 * @param {String} day 
	 * @param {String} month 
	 * @param {String} year 
	 * @param {Object} event 
	 */
	addEvent(year, month, event) {
		// let selectedMonth = this.#events[year][month];
		// if(!(selectedMonth.includes(event.id)))
		// 	this.#events[year][month].push(event);
		if(!this.#events.includes(event.id))
			this.#events.push(event);
	}
	
	/**
	 * Will delete the event with the given id from the event pool of the given year and month.
	 * @param {String} month 
	 * @param {String} year
	 * @param {String} eventId 
	 */
	deleteEvent(month, year, eventId) {
		const eventSumBefore = this.#events[year][month].length;
		var eventList = this.#events[year][month]
		eventList = eventList.filter( listEventId => listEventId !== eventId)
		if(eventList.length !== eventSumBefore)
			console.error('the provided eventId doesnt exist in the given year and month or there was some error while deleteing.');
	}

	getCurrentYear() {
		return this.#currentYear;
	}

	getCurrentMonth() {
		return this.#currentMonth;
	}

	getToday() {
		return this.#currentDay;
	}

	getEvents() {
		return this.#events;
	}

}