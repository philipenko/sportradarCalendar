export default class EventFormController {
	#homeAbbrev = '';
	#awayAbbrev = '';
	#formId;
	#homeScore;
	#awayScore;
	#goalCount = 0;
	#cardCount = 0;


	constructor(formId) {
		this.#formId = formId;
	}

	addListeners() {
		// add listener which checks if team abbrevs were put in and goals were put in and if both are true enable the add goal bttn.
		// and add listener to check if the game already happened or if it is only scheduled. this will work by checking Date(now()),
		// so for the data put in the sportData.json it wont work properly.
		this.#addGoalBttnListener();
		this.#addCardBttnListener();
		this.#addTeamAbbrevListeners();
		this.#addScoreListeners();


		this.#addSubmitListener();
	}

	#addGoalBttnListener() {
		const goalsContainer = document.getElementById("goalsContainer");
		const addGoalButton = document.getElementById("addGoalBttn");

		addGoalButton.addEventListener("click", () => {
		  	const goalInputGroup = document.createElement("div");
		  	goalInputGroup.classList.add("singleGoalInput");
		
			this.#goalCount++;

		  	goalInputGroup.innerHTML = `
				<label for="scorerName">Scorer Name</label>
				<input type="text" name="scorerName" id="scorerName"><br>
		
				<label for="goalTeamAbbrev">Team</label>
				<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalHomeAbbrev"><br>
				<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalAwayAbbrev"><br>
		
				<label for="goalTimeStamp">Goal Time</label>
				<input type="text" name="goalTimeStamp" id="goalTimeStamp"><br>
		  	`;
		
		  	goalsContainer.appendChild(goalInputGroup);
		});
	}

	#addCardBttnListener() {
		const cardsContainer = document.getElementById("cardsContainer");
		const addCardButton = document.getElementById("addCardBttn");

		addCardButton.addEventListener("click", () => {
		  	const singleCardInput = document.createElement("div");
		  	singleCardInput.classList.add("singleCardInput");

			this.#cardCount++;
			
		  	singleCardInput.innerHTML = `
				<label for="foulingPlayer">Player Name</label>
				<input type="text" name="foulingPlayer" id="foulingPlayer"><br>

				<label for="cardTeamAbbrev">Team</label>
				<input type="radio" name="cardHomeAbbrev" id="cardTeamAbbrev"><br>
				<input type="radio" name="cardAwayAbbrev" id="cardTeamAbbrev"><br>

				<label for="yellowCard">Card Type</label>
				<input type="radio" name="cardType${this.#cardCount}" id="yellowCard"><br>
				<input type="radio" name="cardType${this.#cardCount}" id="secondYellowCard"><br>
				<input type="radio" name="cardType${this.#cardCount}" id="red"><br>

				<label for="cardTimeStamp">Card Time</label>
				<input type="text" name="cardTimeStamp" id="cardTimeStamp"><br>
		  	`;

		  	cardsContainer.appendChild(singleCardInput);
		});
	}

	#addTeamAbbrevListeners() {
		const homeAbbrev = document.getElementById('homeAbbrev');
		const awayAbbrev = document.getElementById('awayAbbrev');


		homeAbbrev.addEventListener("input", (event) => {
			this.#homeAbbrev = event.target.value;
			this.#checkGoalBttnEnable();
			console.log(this.#homeAbbrev)
		})

		awayAbbrev.addEventListener("input", (event) => {
			this.#awayAbbrev = event.target.value;
			this.#checkGoalBttnEnable();
			console.log(this.#awayAbbrev)

		})
	}

	#addScoreListeners() {
		const homeScore = document.getElementById('homeGoals');
		const awayScore = document.getElementById('awayGoals');


		homeScore.addEventListener("input", (event) => {
			this.#homeScore = event.target.value;
			this.#checkGoalBttnEnable();
			console.log(this.#homeScore)
		})

		awayScore.addEventListener("input", (event) => {
			this.#awayScore = event.target.value;
			this.#checkGoalBttnEnable();
			console.log(this.#awayScore)
		})
	}

	#checkGoalBttnEnable() {
		const teamsAbbrevsDefined = this.#homeAbbrev != '' && this.#awayAbbrev != '';
		const goalsScored = this.#homeScore > 0 || this.#awayScore > 0;

		if( teamsAbbrevsDefined && goalsScored) {
			document.getElementById('addGoalBttn').disabled = false;
		}
		else document.getElementById('addGoalBttn').disabled = true;
	}

	#addSubmitListener() {
		const eventForm = document.getElementById(this.#formId);

		eventForm.addEventListener("submit", (event) => {
			event.preventDefault();
		
			const formInput = event.target;
		
			// const newHomeTeam = extractTeamData(formInput, 'home');
			// const newAwayTeam = extractTeamData(formInput, 'away');
			// const gameResult  = extractGameResultData(formInput);
		
			fetch('./../data/sportData.json')
				.then(response => response.json())
				.then(events => {
					//TODO create new event data object and store it in the sportData.json file.

				})
				.catch(error => console.error('Error reading JSON file:', error));
			
				// TODO get forms data, store it in an Event, gather goals by looping through the inputs by name, 
				// change the name for goals and cards for this as e.g. the playerName is the same for both,
				// gather cards by looping the same way, store all that data in the sportData.json. YOU CAN DO THIS!!!
			
		});
	}
}