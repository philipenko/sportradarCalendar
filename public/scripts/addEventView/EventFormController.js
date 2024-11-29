import { checkIfPlayed } from "../utils/eventCreation.js";
import EventFormDataHandler from "./EventFormDataHandler.js";
import EventStorer from "./EventStore.js";

export default class EventFormController {
	#formDataHandler = new EventFormDataHandler;
	#eventStore = new EventStorer;
	#eventFormGen;

	#homeAbbrev = '';
	#awayAbbrev = '';
	#formId;
	#homeScore;
	#awayScore;

	constructor(formId, eventFormGen) {
		this.#formId = formId;
		this.#eventFormGen = eventFormGen;
	}

	addFormHandlingListeners() {
		// and add listener to check if the game already happened or if it is only scheduled. this will work by checking Date(now()),
		// so for the data put in the sportData.json it wont work properly.
		this.#addTeamAbbrevListeners();
		this.#addScoreListeners();

		this.#addSubmitListener();
	}


	/**
	 * Will add listeners to both abbreviation inputs of both teams such that when the user writes abbreviations the
	 * listeners will check if the goal button should be enabled. This is done such that the user can input valid 
	 * data in the input fields for one goal. He/She can only do this when the abbreviations of both teams are provided.
	 */
	#addTeamAbbrevListeners() {
		const homeAbbrev = document.getElementById('homeAbbrev');
		const awayAbbrev = document.getElementById('awayAbbrev');


		homeAbbrev.addEventListener("input", (event) => {
			this.#homeAbbrev = event.target.value;
			this.#eventFormGen.setHomeAbbrev(this.#homeAbbrev);
			this.#tryEnableGoalBttn();
			this.#tryEnableCardBttn();
		})

		awayAbbrev.addEventListener("input", (event) => {
			this.#awayAbbrev = event.target.value;
			this.#eventFormGen.setAwayAbbrev(this.#awayAbbrev);
			this.#tryEnableGoalBttn();
			this.#tryEnableCardBttn();
		})
	}

	/**
	 * Will add listeners to the score inputs of the game result such that when the user writes the score the
	 * listeners will check if the goal button should be enabled. This is done such that the user can input valid 
	 * data in the input fields for one goal. He/She can only do this when the score of the game is provided.
	 */
	#addScoreListeners() {
		const homeScore = document.getElementById('homeGoals');
		const awayScore = document.getElementById('awayGoals');

		homeScore.addEventListener("input", (event) => {
			this.#homeScore = event.target.value;
			this.#tryEnableGoalBttn();
			this.#tryEnableCardBttn();
		})

		awayScore.addEventListener("input", (event) => {
			this.#awayScore = event.target.value;
			this.#tryEnableGoalBttn();
			this.#tryEnableCardBttn();
		})
	}

	/**
	 * Will check if the provided button should be enabled. This will only happen if the abbreviations for both
	 * teams are provided, at least one goal was scored and if the game is in the past, otherwise the button 
	 * will remain disabled.
	 */
	#tryEnableGoalBttn() {
		const teamsAbbrevsDefined = this.#homeAbbrev != '' && this.#awayAbbrev != '';
		const goalsScored = this.#homeScore > 0 || this.#awayScore > 0;

		if(teamsAbbrevsDefined && goalsScored) {
			document.getElementById('addGoalBttn').disabled = false;
		}
		else document.getElementById('addGoalBttn').disabled = true;
	}

	#tryEnableCardBttn() {
		const teamsAbbrevsDefined = this.#homeAbbrev != '' && this.#awayAbbrev != '';

		if(teamsAbbrevsDefined) {
			document.getElementById('addCardBttn').disabled = false;
		}
		else document.getElementById('addCardBttn').disabled = true;
	}

	/**
	 * Will add a listener to the form of the addEvent page that listens for the submit of the form. After submition
	 * the input data will be used to create a new Event which will be visible in the calendar page.
	 */
	#addSubmitListener() {
		const eventForm = document.getElementById(this.#formId);

		eventForm.addEventListener("submit", (event) => {
			event.preventDefault();
		
			const formInput = event.target;
			const newEvent = this.#formDataHandler.extractFormInput(formInput);
			
			this.#eventStore.storeEvent(newEvent);
		});
	}
}