export function nameToSlug(teamName) {
	return teamName.toLowerCase().replace(/\s+/g, '-');
}

export function getSelectedRadioBttn(radioBttns) {
	for(let j = 0; j < radioBttns.length; ++j) {
		const radioBttn = radioBttns[j];

		if(radioBttn.checked)
			return radioBttn;
	}
	
	return null;
}

export function checkIfPlayed(date, time) {
	const dateTimeString = time? `${date}T${time}` : `${date}T00:00:00`;
	const givenTime = new Date(dateTimeString);
	const currentTime = new Date(Date.now());

	if(givenTime < currentTime)
		return 'played';

	return 'scheduled';
}