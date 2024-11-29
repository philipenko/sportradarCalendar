# sportradarCalendar
This repo is solely dedicated to the task given by the sportradar team to proceed in the interview process.

### Overview
This application shows a calendar which can be traversed using the arrows on the top left to change the
displayed month. When an event is clicked the event details show up on the bottom of the calendar, so
depending on the screen size this might not be immidiately noticable. 

When moving to the add event form page it is important to note that the competition name and the date
are required to be able to submit an event. When goals or cards are desired, it is necessary to put in
the abbreviations of both teams for the card button to be enabled and additionally also a score of greater
than 0 for the goal button to be enabled.

### How to run
in root folder, run command: 		
```
docker compose up -d
```
access webpage on:  				
```
http://localhost:8080/
```

### Decisions during development
- I used the sportData.json file for event samples. 
- The current day is set to the 3rd of January, as the events in the 
sportData.json file suggest it is that day. This can be change to today as indicated
in the CalendarModel class.
- The sport type of and event is only stored during the current users session and not permanently in the
docker volume, as I wanted to stick with the format given in the sportData.json file.
- I used Docker for permanent event storing by using Volumes.