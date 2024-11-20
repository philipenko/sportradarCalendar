import { checkTeamOccurances } from "./utils/eventDisplay.js";

export default class EventDisplayer {

	#detailsContainerId;

	constructor(detailsContainerId) {
		this.#detailsContainerId = detailsContainerId;
	}

	/**
	 * Will populate the eventDetails container with the given containerId with all the 
	 * data of the provided event and display it in an eventDetails view.
	 * @param {Event} eventData 
	 */
	displayEvent(eventData) {
		const eventContainer = document.getElementById(this.#detailsContainerId);
		
		var sportType = eventContainer.querySelector('#sportType');
		sportType.innerHTML = eventData.getSportType();
		
		var competitionName = eventContainer.querySelector('#competitionName')
		competitionName.innerHTML = eventData.getCompetitionName();
		
		var stageType = eventContainer.querySelector('#stageType');
		stageType.innerHTML = eventData.getStageType().toLowerCase();
		
		const homeTeamData = eventData.getHomeTeam();
		const awayTeamData = eventData.getAwayTeam();
		const result 	   = eventData.getResult();

		this.#displayHomeTeam(homeTeamData, result);
		this.#displayAwayTeam(awayTeamData, result);
		this.#displayScore(result);
		
		eventContainer.style.display = 'block';
	}

	#displayHomeTeam(homeTeamData, gameResult) {
		const goalsListId = '#homeTeamGoalsList';
		const cardsListId = '#homeTeamCardsList';

		this.#displayGoals(gameResult.goals, goalsListId, homeTeamData.abbreviation);
		
		const cards = [gameResult.yellowCards, gameResult.secondYellowCards, gameResult.directRedCards];

		this.#displayCards(cards, cardsListId, homeTeamData.abbreviation);

		const eventContainer = document.getElementById(this.#detailsContainerId);
		var homeTeamName = eventContainer.querySelector('#homeTeamName');

		homeTeamName.innerText = homeTeamData.name;
	}

	#displayAwayTeam(awayTeamData, gameResult) {
		const goalsListId = '#awayTeamGoalsList';
		const cardsListId = '#awayTeamCardsList';

		this.#displayGoals(gameResult.goals, goalsListId, awayTeamData.abbreviation);
		
		const cards = [gameResult.yellowCards, gameResult.secondYellowCards, gameResult.directRedCards];

		this.#displayCards(cards, cardsListId, awayTeamData.abbreviation);

		const eventContainer = document.getElementById(this.#detailsContainerId);
		var awayTeamName = eventContainer.querySelector('#awayTeamName');

		awayTeamName.innerText = awayTeamData.name;
	}

	#displayScore(result) {
		const eventContainer = document.getElementById(this.#detailsContainerId);

		var homeGoals = eventContainer.querySelector('#homeGoals');
		homeGoals.innerText = result.homeGoals;

		var awayGoals = eventContainer.querySelector('#awayGoals');
		awayGoals.innerText = result.awayGoals;
	}

	#displayGoals(goalsData, goalsListId, teamAbrev) {
		const eventContainer = document.getElementById(this.#detailsContainerId);
		
		var goalsList = eventContainer.querySelector(goalsListId);
		goalsList.innerHTML = '';

		if(goalsData.length !== 0) {
			for(const goalIndex in goalsData) {
				
				const goalData = goalsData[goalIndex];
				if(goalData.teamName === teamAbrev) {
					const goalContainer = document.createElement('p');
					
					goalContainer.className = 'goal';
					goalContainer.innerText = goalData.playerName + ' ' + goalData.time;
					
					goalsList.appendChild(goalContainer);
				}
			}
		} else {
			const noGoals = document.createElement('p');

			noGoals.classList = 'noGoals';
			noGoals.innerText = 'no goals';

			goalsList.appendChild(noGoals);
		}
	}

	#displayCards(allCards, cardsListId, teamAbrev) {
		const eventContainer = document.getElementById(this.#detailsContainerId);
		
		var cardsList = eventContainer.querySelector(cardsListId);
		cardsList.innerHTML = '';

		const yellow = checkTeamOccurances(allCards[0], teamAbrev);
		const secondYellow = checkTeamOccurances(allCards[1], teamAbrev);
		const directRed = checkTeamOccurances(allCards[2], teamAbrev);

		if(yellow > 0 || secondYellow > 0 || directRed > 0) {

			for(const cardGroupIndex in allCards) {
				const cardGroup = allCards[cardGroupIndex];
				for(const cardIndex in cardGroup) {
					
					const cardData = cardGroup[cardIndex];
					if(cardData.teamName === teamAbrev) {

						const playerContainer = document.createElement('p');
						
						playerContainer.className = 'card';
						playerContainer.innerText = cardData.playerName + ' ' + cardData.time;
						
						cardsList.appendChild(playerContainer);
					}
				}
			}

		} else {
			const noGoals = document.createElement('p');

			noGoals.classList = 'noCards';
			noGoals.innerText = 'no cards';

			cardsList.appendChild(noGoals);
		}
	}
} 