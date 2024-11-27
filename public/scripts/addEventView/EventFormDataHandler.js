import { checkIfPlayed, getSelectedRadioBttn, nameToSlug } from "../utils/eventCreation.js";

export default class EventFormDataHandler {

	/**
	 * Will use the input of a form to extract data and creates an event using the input data.
	 * @param {EventTarget} formInput
	 * @returns an object literal with all the data from the given form input using the same structure as in sportData.json.
	 */
	extractFormInput(formInput) {
		const season 	  = formInput.querySelector('#season').value;
		const time 		  = formInput.querySelector('#time').value;
		const date 		  = formInput.querySelector('#date').value;
		const stadium 	  = formInput.querySelector('#stadium').value;
		const newHomeTeam = this.#extractTeamData(formInput, 'home');
		const newAwayTeam = this.#extractTeamData(formInput, 'away');
		const gameResult  = this.#extractGameResultData(formInput);
		const stage		  = this.#extractStageData(formInput);
		const group 	  = formInput.querySelector('#group').value;
		const compName 	  = formInput.querySelector('#compName').value;

		const newEvent = {
            "season": season,
            "status": checkIfPlayed(date, time),
            "timeVenueUTC": time,
            "dateVenue": date,
            "stadium": stadium,
            "homeTeam": newHomeTeam,
            "awayTeam": newAwayTeam,
            "result": gameResult,
            "stage": stage,
            "group": group,
            "originCompetitionId": nameToSlug(compName),
            "originCompetitionName": compName
        }

		return newEvent;
	}

	/**
	 * Will extract only data that is related to a specific team from the form input. The required team is specified
	 * by providing either the parameter teamType with 'home' - for the home team or 'away' - for the away team. 
	 * @param {DOMTokenList} formInput 
	 * @param {String} teamType 
	 * @returns an object literal with the same structure given in the sportData.json file.
	*/
	#extractTeamData(formInput, teamType) {

		if(teamType === 'home') {
			const homeName     	   = formInput.querySelector('#homeName').value;
			const homeOfficialName = formInput.querySelector('#homeOfficialName').value;
			const homeAbbrev 	   = formInput.querySelector('#homeAbbrev').value;
			const homeCountryCode  = formInput.querySelector('#homeCountryCode').value;
			const homeStagePos 	   = formInput.querySelector('#homeStagePos').value;

			var newHomeTeam = {
				"name": homeName,
				"officialName": homeOfficialName,
				"slug": nameToSlug(homeOfficialName),
				"abbreviation": homeAbbrev,
				"teamCountryCode": homeCountryCode,
				"stagePosition": homeStagePos
			}

			return newHomeTeam;
		}

		if(teamType === 'away') {
			const awayName     	   = formInput.querySelector('#awayName').value;
			const awayOfficialName = formInput.querySelector('#awayOfficialName').value;
			const awayAbbrev 	   = formInput.querySelector('#awayAbbrev').value;
			const awayCountryCode  = formInput.querySelector('#awayCountryCode').value;
			const awayStagePos 	   = formInput.querySelector('#awayStagePos').value;
			
			var newAwayTeam = {
				"name": awayName,
				"officialName": awayOfficialName,
				"slug": nameToSlug(awayOfficialName),
				"abbreviation": awayAbbrev,
				"teamCountryCode": awayCountryCode,
				"stagePosition": awayStagePos
			}

			return newAwayTeam;
		}
	}

	/**
	 * Will extract only data that is related to the game result from the form input.
	 * @param {DOMTokenList} formInput 
	 * @returns an object literal with the same structure given in the sportData.json file.
	*/
	#extractGameResultData(formInput) {
		const homeGoals    = formInput.querySelector('#homeGoals').value;
		const awayGoals    = formInput.querySelector('#awayGoals').value;
		const homeTeamName = formInput.querySelector('#homeName').value;
		const awayTeamName = formInput.querySelector('#awayName').value;
		const message 	   = formInput.querySelector('#message').value;
		
		var newGameResult = {
			"homeGoals": homeGoals,
	        "awayGoals": awayGoals,
	        "winner": this.#determineWinner(homeGoals, awayGoals, homeTeamName, awayTeamName),
	        "message": message,
	        "goals": this.#gatherGoalsData(),
	        "yellowCards": this.#gatherCardsData("yellow card"),
	        "secondYellowCards": this.#gatherCardsData("second yellow card"),
	        "directRedCards": this.#gatherCardsData("direct red card")
		}

		return newGameResult;
	}

	/**
	 * Will determine the team that won using the scored goals of both teams. if one team 
	 * has more goals than the other then the team with more goals is declared a winner.
	 * Otherwise if both teams scored the same amount of goals there is no winner declared.
	 * @param {Integer} homeGoals 
	 * @param {Integer} awayGoals 
	 * @param {String} homeTeamName 
	 * @param {String} awayTeamName 
	 * @returns the name of the team that won or an empty string if no team won.
	*/
	#determineWinner(homeGoals, awayGoals, homeTeamName, awayTeamName) {
		const NO_WINNER = '';

		if(homeGoals === awayGoals)
			return NO_WINNER;

		if(homeGoals > awayGoals)
			return homeTeamName;

		return awayTeamName;
	}

	/**
	 * Will iterate over all scorers names, goal time stamps and will check in each iteration
	 * which of the radio buttons representing the team abbreviations was checked.
	 * @returns an object literal with the same structure given in the sportData.json file.
	 */
	#gatherGoalsData() {
		var goals = [];

		const scorerNames = document.getElementsByName('scorerName');
		const goalsTimeStamps = document.getElementsByName('goalTimeStamp');

		const goalAmount = scorerNames.length;
		
		for(let i = 0; i < goalAmount; ++i) {
			const scorer = scorerNames[i].value;

			const teamAbbrevs = document.getElementsByName(`goalTeamAbbrev${i}`);
			const selectedAbbrev = getSelectedRadioBttn(teamAbbrevs).value;

			const timeStamp = goalsTimeStamps[i].value; 

			const newGoal = {
				"playerName": scorer,
				"teamAbbrev"  : selectedAbbrev? selectedAbbrev : '',
				"timeStamp" : timeStamp
			}

			goals.push(newGoal);
		}

		return goals;
	}

	/**
	 * Will iterate over all punished players names, card time stamps and will check in each iteration
	 * which of the radio buttons representing the team abbreviations  and the card types was checked.
	 * @returns an object literal with the same structure given in the sportData.json file.
	 */
	#gatherCardsData(cardType) {
		var yellowCards = [];

		const punishedPlayers = document.getElementsByName('punishedPlayer');
		const cardTimeStamps  = document.getElementsByName('cardTimeStamp');

		const cardsAmount = punishedPlayers.length;

		for(let i = 0; i < cardsAmount; ++i) {
			const playerName = punishedPlayers[i].value;

			const teamAbbrevs = document.getElementsByName(`cardTeamAbbrev${i}`);
			const selectedAbbrev = getSelectedRadioBttn(teamAbbrevs).value;

			const cardTypes = document.getElementsByName(`cardType${i}`);
			const selectedCardType = getSelectedRadioBttn(cardTypes).value;
			
			if(selectedCardType !== cardType)
				continue

			const cardTimeStamp = cardTimeStamps[i];

			const newCard = {
				"playerName":playerName, 
				"teamAbbrev": selectedAbbrev? selectedAbbrev : '', 
				"time": cardTimeStamp
			}

			yellowCards.push(newCard);
		}

		return yellowCards;
	}

	/**
	 * Will extract only data that is related to the stage from the form input.
	 * @param {DOMTokenList} formInput 
	 * @returns an object literal with the same structure given in the sportData.json file.
	*/
	#extractStageData(formInput) {
		const stageName = formInput.querySelector('#stage').value;

		const newStage = {
			"id": stageName.toUpperCase(),
            "name": stageName.toUpperCase(),
            "ordering": null
		}

		return newStage;
	}
}