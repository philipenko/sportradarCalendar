export default class EventStorer {
	#storeLocation = './../data/sportData.json';

	/**
	 * Will store the given event. This is done by sending a POST request to the server
	 * which will then permanently store the given event.
	 * @param {Object} newEvent 
	 */
	storeEvent(newEvent) {
		fetch('http://localhost:8080/add-event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newEvent)
		})
		.catch(error => console.error('Error reading JSON file:', error));
	}
}

