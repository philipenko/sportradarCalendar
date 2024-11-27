import Event from "../../model/Event.js";
import { parseEventDate } from "../../utils/calendarGeneration.js";

export default class EventsProvider {
	#dataSource;
	#calendarModel;
	#calendarGen;

	
	/**
	 * Attaches all the events from the file ('sportData.json') to the given calendarModel. The events data is taken
	 * from the this.datasource. 
	 * @param {HTMLDivElement} calendarModel 
	*/
	#addEventsToCalendar() {
		fetch('http://localhost:8080/data')
		.then(response => {
			if(!response.ok)
				throw new Error(`Error fetching events data. Status: ${response.status}`);

			return response.json()
		})
		.then(events => {
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