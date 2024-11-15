import { parseEventDate } from "../utils/calendarGeneration.js";

export default class Event {
	id;
	#title;
	#date = {};
	#homeTeamName;
	#awayTeamname;
	constructor(event) {
		this.id = crypto.randomUUID();
		this.#title = event.originCompetitionName;
		let dateArray = parseEventDate(event.dateVenue);
		this.#date['year'] = parseInt(dateArray[0]); 
		this.#date['month'] = parseInt(dateArray[1]); 
		this.#date['day'] = parseInt(dateArray[2]); 
		this.#homeTeamName = event.homeTeam? event.homeTeam.name: '';
		this.#awayTeamname = event.awayTeam? event.awayTeam.name: '';
	}

	getTitle() {
		return this.#title;
	}
	
	getDate() {
		return this.#date;
	}

	getHomeTeamName() {
		return this.#homeTeamName;
	}

	getAwayTeamName() {
		return this.#awayTeamname;
	}
}