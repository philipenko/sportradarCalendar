export default class EventStorer {
	#storeLocation = './../data/sportData.json';

	storeEvent(newEvent) {
		fetch('./../data/sportData.json')
				.then(response => response.json())
				.then(events => {
					//TODO create new event data object and store it in the sportData.json file.
					
					console.log(events)
				})
				.catch(error => console.error('Error reading JSON file:', error));
	}
}

