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

	/**
	 * Will add a ResizeObserver to the given div element to check if the team abbreviations
	 * should be displayed in the small event containers in the calendar. It will hide the 
	 * names if the window size is smaller than 600px. This is only used for different screen 
	 * sizes to ensure a good user experience.
	 * @param {HTMLDivElement} eventContainer 
	 */
	tryHidingEventNames(eventContainer) {
		const resizeObs = new ResizeObserver((events) => {
			var teamNames;

			for(var event of events) {
				teamNames = event.target.querySelector('p');
			}

			if(window.innerWidth < 600) {
				teamNames.style.display = 'none';
			}
			else {
				teamNames.style.display = 'inline';
			}
		})

		resizeObs.observe(eventContainer);
	}
}