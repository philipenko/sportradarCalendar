import EventFormController from "./EventFormController.js";

const formId = 'eventForm'

const formContrl = new EventFormController(formId);

formContrl.addListeners();