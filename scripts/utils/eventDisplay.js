export function checkTeamOccurances(eventList, teamAbrev) {
	var occur = 0;

	for(const eventIndex in eventList) {
		const event = eventList[eventIndex];

		if(event.teamName === teamAbrev)
			occur++;
	}

	return occur;
}