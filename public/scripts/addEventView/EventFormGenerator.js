export default class EventFormGenerator {
	#formId;
	#homeAbbrev;
	#awayAbbrev;

	#goalCount = 0;
	#cardCount = 0;

	constructor(formId) {
		this.#formId = formId;
	}

	setHomeAbbrev(homeAbbrev) {
		this.#homeAbbrev = homeAbbrev;
	}
	setAwayAbbrev(awayAbbrev) {
		this.#awayAbbrev = awayAbbrev;
	}
	
	addFormExpandingListeners() {
		this.#addGoalBttnListener();
		this.#addCardBttnListener();
	}

	/**
	 * Will add a listener to the 'addGoalBttn' button in the form such that when the button gets clicked the form gets expanded with
	 * inputs for one scored goal.
	 */
	#addGoalBttnListener() {
		const goalsContainer = document.getElementById("goalsContainer");
		const addGoalButton = document.getElementById("addGoalBttn");

		addGoalButton.addEventListener("click", () => {
			const goalInputGroup = document.createElement("div");
			goalInputGroup.classList.add("singleGoalInput");
	
			
			goalInputGroup.innerHTML = `
				<label for="scorerName">Scorer Name</label>
				<input type="text" name="scorerName" id="scorerName"><br>

				<label for="goalTeamAbbrev">Team</label><br>
				<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalHomeAbbrev" value="${this.#homeAbbrev}">${this.#homeAbbrev}<br>
				<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalAwayAbbrev" value="${this.#awayAbbrev}">${this.#awayAbbrev}<br>

				<label for="goalTimeStamp">Goal Time (min)</label>
				<input type="number" name="goalTimeStamp" id="goalTimeStamp"><br>
			`;
			
			this.#goalCount++;
			
			goalsContainer.appendChild(goalInputGroup);
		});
	}

	/**
	 * Will add a listener to the 'addCardBttn' button in the form such that when the button gets clicked the form gets expanded with
	 * inputs for one card.
	 */
	#addCardBttnListener() {
		const cardsContainer = document.getElementById("cardsContainer");
		const addCardButton = document.getElementById("addCardBttn");

		addCardButton.addEventListener("click", () => {
			const singleCardInput = document.createElement("div");
			singleCardInput.classList.add("singleCardInput");

			this.#cardCount++;
			
			singleCardInput.innerHTML = `
				<label for="foulingPlayer">Player Name</label>
				<input type="text" name="punishedPlayer" id="foulingPlayer"><br>

				<label for="cardTeamAbbrev">Team</label>
				<input type="radio" name="cardTeamAbbrev" id="cardHomeAbbrev" value="${this.#homeAbbrev}">${this.#homeAbbrev}<br>
				<input type="radio" name="cardTeamAbbrev" id="cardAwayAbbrev" value="${this.#awayAbbrev}">${this.#awayAbbrev}<br>

				<label for="yellowCard">Card Type</label>
				<input type="radio" name="cardType${this.#cardCount}" id="yellowCard" value="yellow card"><br>
				<input type="radio" name="cardType${this.#cardCount}" id="secondYellowCard" value="second yellow card"><br>
				<input type="radio" name="cardType${this.#cardCount}" id="redCard" value="direct red card"><br>

				<label for="cardTimeStamp">Card Time (min)</label>
				<input type="number" name="cardTimeStamp" id="cardTimeStamp"><br>
			`;
			cardsContainer.appendChild(singleCardInput);
		});
	}
	
}