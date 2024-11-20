import { parseEventDate } from "../utils/calendarGeneration.js";

export default class Event {
	id;
	#eventData;

	constructor(event) {
		this.id = crypto.randomUUID();
		let dateArray = parseEventDate(event.dateVenue);
		event['date'] = {
			'year' : parseInt(dateArray[0]),
			'month': parseInt(dateArray[1]),
			'day'  : parseInt(dateArray[2])
		};

		if(!event['homeTeam'] )
			event['homeTeam'] = {
				'name'		  : 'unknown',
				'abbreviation': '?'
			}

		if(!event['awayTeam'] )
			event['awayTeam'] = {
				'name'		  : 'unknown',
				'abbreviation': '?'
			}
		
		event['sportType'] = 'Football';
		
		this.#eventData = event;
	}

	getDate() {
		return this.#eventData.date;
	}

	getHomeTeamName() {
		return this.#eventData.homeTeam.name;
	}
	getHomeTeamAbr() {
		return this.#eventData.homeTeam.abbreviation;
	}

	getAwayTeamName() {
		return this.#eventData.awayTeam.name;
	}
	getAwayTeamAbr() {
		return this.#eventData.awayTeam.abbreviation;
	}

	getSportType() {
		return this.#eventData.sportType;
	}

	getCompetitionName() {
		return this.#eventData.originCompetitionName;
	}

	getStageType() {
		return this.#eventData.stage.name;
	}
}