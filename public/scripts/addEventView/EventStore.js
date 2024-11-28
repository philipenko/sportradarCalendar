export default class EventStorer {
	#storeLocation = './../data/sportData.json';

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

