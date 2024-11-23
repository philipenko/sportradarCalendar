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

	/**
	 * Will add an eventlistener to the element with the given ID, assuming that the ID is from a submit
	 * button of a form, such that the data that gets submitted can be stored locally.
	 * @param {String} submitId 
	 */
	attachEventForm(submitId) {
		const submitButton = document.getElementById(submitId);
		console.log(submitButton)
		submitButton.addEventListener('onclick', (event) => this.#handleNewEvent(event));
	}

	/**
	 * Will get the id of the clicked div and use that id to search in the data store 
	 * for an event with the same id. If the event is found then the display of this
	 * event will be triggered using the events data.
	 * @param {MouseEvent} clickedEvent 
	 */
	showEventDetails(clickedEvent) {
		const eventContainerId = clickedEvent.target.closest('div').id;
		const eventData = this.#calendar.getEvents().filter((event) => event.id === eventContainerId)[0];
		this.#selectedEvent = eventData;

		if(eventData) {
			this.#eventDispl.displayEvent(eventData)
		}
	}

	#handleNewEvent(event) {
		event.preventDefault();

	}
}