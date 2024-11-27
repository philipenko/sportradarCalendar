import EventFormController from "./EventFormController.js";
import EventFormGenerator from "./EventFormGenerator.js";

const formId = 'eventForm'

const formGen = new EventFormGenerator(formId);
const formContrl = new EventFormController(formId, formGen);

formGen.addFormExpandingListeners()
formContrl.addFormHandlingListeners();