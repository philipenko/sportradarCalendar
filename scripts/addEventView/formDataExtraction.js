import { officNameToSlug } from "../utils/eventStoring.js";

/**
 * Will extract only data that is related to a specific team from the form input. The required team is specified
 * by providing either the parameter teamType with 'home' - for the home team or 'away' - for the away team. 
 * @param {DOMTokenList} formInput 
 * @param {String} teamType 
 * @returns an object literal with the same structure given in the sportData.json file.
 */
function extractTeamData(formInput, teamType) {
	
	if(teamType === 'home') {
		const officName = formInput[7].value;
		var newHomeTeam = {
			"name": formInput[6].value,
			"officialName": officName,
			"slug": officNameToSlug(officName),
			"abbreviation": formInput[8].value,
			"teamCountryCode": formInput[9].value,
			"stagePosition": formInput[10].value
		}
		return newHomeTeam;
	}
	if(teamType === 'away') {
		const officName = formInput[12].value;
		var newAwayTeam = {
			"name": formInput[11].value,
			"officialName": officName,
			"slug": officNameToSlug(officName),
			"abbreviation": formInput[13].value,
			"teamCountryCode": formInput[14].value,
			"stagePosition": formInput[15].value
		}
		return newAwayTeam;
	}
}

/**
 * Will extract only data that is related to the game result from the form input.
 * @param {DOMTokenList} formInput 
 * @returns an object literal with the same structure given in the sportData.json file.
 */
function extractGameResultData(formInput) {
	const homeGoals = formInput[16].value;
	const awayGoals = formInput[17].value;
	const homeTeamName = formInput[6].value;
	const awayTeamName = formInput[11].value;


	var newGameResult = {
		"homeGoals": homeGoals,
        "awayGoals": awayGoals,
        "winner": determineWinner(homeGoals, awayGoals, homeTeamName, awayTeamName),
        "message": formInput[18].value,
        "goals": gatherGoalsData(),
        "yellowCards": '',// gatherYellowCardsData(),
        "secondYellowCards": '',// gatherSecondYellowData(),
        "directRedCards": ''// gatherRedCardsData()
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
function determineWinner(homeGoals, awayGoals, homeTeamName, awayTeamName) {
	if(homeGoals === awayGoals)
		return '';

	if(homeGoals > awayGoals)
		return homeTeamName;

	return awayTeamName;
}

function gatherGoalsData() {
	const scorerNames = document.getElementsByName('scorerName');


}
