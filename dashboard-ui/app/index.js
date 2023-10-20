import * as UI_Helpers from "./ui_helpers.js";
import * as EventListeners from "./eventListeners.js";

function init() {
  UI_Helpers.fetchNdisplayTableNames();
  EventListeners.trackTableSelectionInSidebar();
  EventListeners.handleNewTableCreateButton();
  EventListeners.handleAddNewRowButton();
  EventListeners.handleAddNewColumnButton();
}

init();
