export default class EventsProvider {
	dataSource;

	constructor(dataSource) {
		this.dataSource = dataSource
	}

	/**
	 * Attaches all the events from the current month to the given calendar. The events data is taken
	 * from the this.datasource. 
	 * @param {HTMLDivElement} calendar 
	 */
	attachEvents(calendar) {
		//TODO: get data from datasource and add events to specific days.
	}
}