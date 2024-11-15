import FakeEventsDB from "./FakeEventsDB.js";
import Calendar from "./model/Calendar.js";
import EventsProvider from "./EventsProvider.js";
import CalendarGenerator from "./CalenderGenerator.js";

const calendarContainerId = 'calendarContainer';

const dataSource = new FakeEventsDB();
const calendarModel = new Calendar();
const eventsProvider = new EventsProvider(dataSource, calendarModel);
const calendarGen = new CalendarGenerator(eventsProvider, calendarModel, calendarContainerId);

eventsProvider.attachCalendarGen(calendarGen);
calendarGen.createCalendar();