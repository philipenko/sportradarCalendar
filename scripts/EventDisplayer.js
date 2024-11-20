export default class EventDisplayer {

	/**
	 * Will populate the eventDetails container with the given containerId with all the 
	 * data of the provided event and display it in an eventDetails view.
	 * @param {Event} eventData 
	 * @param {String} containerId 
	 */
	displayEvent(eventData, containerId) {
		const eventContainer = document.getElementById(containerId);
		
		var sportType = eventContainer.querySelector('#sportType');
		sportType.innerHTML = eventData.getSportType();
		
		var competitionName = eventContainer.querySelector('#competitionName')
		competitionName.innerHTML = eventData.getCompetitionName();
		
		var stageType = eventContainer.querySelector('#stageType');
		stageType.innerHTML = eventData.getStageType().toLowerCase();
		
		this.#displayHomeTeam();
		
		eventContainer.style.display = 'block';
	}

	#displayHomeTeam() {
		//
	}
} 