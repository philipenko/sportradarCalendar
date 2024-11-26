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
	const dateTimeString = `${date}${time}`;
	const givenTime = Date(dateTimeString);
	const currentTime = Date(Date.now());

	if(givenTime < currentTime)
		return 'played';

	return 'scheduled';
}