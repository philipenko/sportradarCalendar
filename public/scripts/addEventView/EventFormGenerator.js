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
				<div class="addedInput">
					<div class="inputWrapper">
						<label for="scorerName">Scorer Name</label><br>
						<input type="text" name="scorerName" id="scorerName"><br>
					</div>

					<div class="radioInputWrapper">
						<label for="goalTeamAbbrev">Team</label><br>
						<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalHomeAbbrev" value="${this.#homeAbbrev}">${this.#homeAbbrev}<br>
						<input type="radio" name="goalTeamAbbrev${this.#goalCount}" id="goalAwayAbbrev" value="${this.#awayAbbrev}">${this.#awayAbbrev}<br>
					</div>

					<div class="inputWrapper">
						<label for="goalTimeStamp">Goal Time (min)</label><br>
						<input type="number" name="goalTimeStamp" id="goalTimeStamp"><br>
					</div>
				</div>
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
			
			singleCardInput.innerHTML = `
				<div class="addedInput">
					<div class="inputWrapper">
						<label for="foulingPlayer">Player Name</label><br>
						<input type="text" name="punishedPlayer" id="foulingPlayer"><br>
					</div>

					<div class="radioInputWrapper">
						<label for="cardTeamAbbrev">Team</label><br>
						<input type="radio" name="cardTeamAbbrev${this.#cardCount}" id="cardAwayAbbrev" value="${this.#homeAbbrev}">${this.#awayAbbrev}<br>
						<input type="radio" name="cardTeamAbbrev${this.#cardCount}" id="cardHomeAbbrev" value="${this.#awayAbbrev}">${this.#homeAbbrev}<br>
					</div>

					<div class="radioInputWrapper">
						<label for="yellowCard">Card Type</label><br>
						<input type="radio" name="cardType${this.#cardCount}" id="yellowCard" value="yellow card">yellow card<br>
						<input type="radio" name="cardType${this.#cardCount}" id="secondYellowCard" value="second yellow card">second yellow card<br>
						<input type="radio" name="cardType${this.#cardCount}" id="redCard" value="direct red card">direct red card<br>
					</div>

					<div class="inputWrapper">
						<label for="cardTimeStamp">Card Time (min)</label><br>
						<input type="number" name="cardTimeStamp" id="cardTimeStamp"><br>
					</div>
				</div>
			`;

			this.#cardCount++;

			cardsContainer.appendChild(singleCardInput);
		});
	}
	
}