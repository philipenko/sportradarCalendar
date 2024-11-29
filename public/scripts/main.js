import Calendar from "./model/Calendar.js";
import EventsProvider from "./calendarView/sportEvent/EventsProvider.js";
import CalendarGenerator from "./calendarView/CalenderGenerator.js";
import { EventController } from "./calendarView/sportEvent/EventController.js";
import CalendarController from "./calendarView/CalendarController.js";

const calendarContainerId = 'calendarContainer';
const eventDetailsId = 'eventDetails';
const dataSource = 'sportData.json';

const calendarModel  = new Calendar();
const eventsProvider = new EventsProvider(dataSource, calendarModel);
const eventCntrl     = new EventController(calendarModel, eventDetailsId);
const calendarGen    = new CalendarGenerator(eventsProvider, calendarModel, eventCntrl, calendarContainerId);
const calendarCntrl  = new CalendarController(calendarGen, calendarModel);

eventsProvider.attachCalendarGen(calendarGen);
calendarGen.createCalendar();