import Event from "./model/Event.js";
import { parseEventDate } from "./utils/calendarGeneration.js";

export default class EventsProvider {
	#dataSource;
	#calendarModel;
	#calendarGen;

	
	/**
	 * Attaches all the events from the current month to the given calendarModel. The events data is taken
	 * from the this.datasource. 
	 * @param {HTMLDivElement} calendarModel 
	*/
	#addEventsToCalendar() {
		fetch('../data/sportData.json')
		.then(response => response.json())
		.then(events => {
			console.log(events)
  		 	events['data'].forEach(el => {
				let event = new Event(el);
				let eventDate = event.getDate();
				this.#calendarModel.addEvent(eventDate.year, eventDate.month, event);
			});
		})
		.then(() => {
			var calendarContainer = document.querySelector('#calendarContainer');
			calendarContainer.innerHTML = '';
			this.#calendarGen.createCalendar();
		})
		.catch(error => console.error('Error reading JSON file:', error));
	}

	constructor(dataSource, calendarModel) {
		this.#dataSource = dataSource;
		this.#calendarModel = calendarModel;
		this.#addEventsToCalendar()
	}

	attachCalendarGen(calendarGen) {
		this.#calendarGen = calendarGen;
	}
}