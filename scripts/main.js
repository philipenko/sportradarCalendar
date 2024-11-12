var dataSource = new FakeEventsDB();
var eventsHandler = new EventsHandler(dataSource);
var calendarGen = new CalendarGenerator(eventsHandler);

var calendar = document.getElementById('calendarContainer');

calendarGen.createCalendar(calendar);