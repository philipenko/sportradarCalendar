import EventDisplayer from "./EventDisplayer.js";

export class EventController {

	#calendar;
	#selectedEvent;
	#eventDispl = new EventDisplayer();

	constructor(calendar, detailsContainerId) {
		this.#calendar = calendar;
		this.#eventDispl = new EventDisplayer(detailsContainerId);

		this.showEventDetails = this.showEventDetails.bind(this);
	}

	showEventDetails(clickedEvent) {
		const eventContainerId = clickedEvent.target.closest('div').id;
		const eventData = this.#calendar.getEvents().filter((event) => event.id === eventContainerId)[0];
		this.#selectedEvent = eventData;

		if(eventData) {
			this.#eventDispl.displayEvent(eventData)
		}
		// TODO create structure for event details pagein the index.html file and then manipulate the 
		// container of the details page when a new event gets clicked.
	}
}