import FakeEventsDB from "./FakeEventsDB.js";
import Calendar from "./model/Calendar.js";
import EventsProvider from "./sportEvent/EventsProvider.js";
import CalendarGenerator from "./CalenderGenerator.js";
import { EventController } from "./sportEvent/EventController.js";

const calendarContainerId = 'calendarContainer';
const eventDetailsId = 'eventDetails';
const newEventFormId = 'submitEvent'
const dataSource = 'sportData.json';

const calendarModel = new Calendar();
const eventsProvider = new EventsProvider(dataSource, calendarModel);
const eventCntrl = new EventController(calendarModel, eventDetailsId);
const calendarGen = new CalendarGenerator(eventsProvider, calendarModel, eventCntrl, calendarContainerId);

eventsProvider.attachCalendarGen(calendarGen);
eventCntrl.attachEventForm(newEventFormId);
calendarGen.createCalendar();
// clientCntrl.initialise();