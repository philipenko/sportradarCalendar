import FakeEventsDB from "./FakeEventsDB.js";
import Calendar from "./model/Calendar.js";
import EventsProvider from "./EventsProvider.js";
import CalendarGenerator from "./CalenderGenerator.js";
import { EventController } from "./EventController.js";

const calendarContainerId = 'calendarContainer';
const eventDetailsId = 'eventDetails';

const dataSource = new FakeEventsDB();
const calendarModel = new Calendar();
const eventsProvider = new EventsProvider(dataSource, calendarModel);
const eventCntrl = new EventController(calendarModel, eventDetailsId);
const calendarGen = new CalendarGenerator(eventsProvider, calendarModel, eventCntrl, calendarContainerId);

eventsProvider.attachCalendarGen(calendarGen);
calendarGen.createCalendar();
// clientCntrl.initialise();