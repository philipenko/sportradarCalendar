import FakeEventsDB from "./FakeEventsDB.js";
import Calendar from "./model/Calendar.js";
import EventsProvider from "./EventsProvider.js";
import CalendarGenerator from "./CalenderGenerator.js";

const dataSource = new FakeEventsDB();
const calendarModel = new Calendar(dataSource);
const eventsProvider = new EventsProvider(dataSource);
const calendarGen = new CalendarGenerator(eventsProvider, calendarModel);

const calendarId = 'calendarContainer';
calendarGen.createCalendar(calendarId);