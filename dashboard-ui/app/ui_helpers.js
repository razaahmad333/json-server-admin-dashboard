import * as UTILS from "./utils.js";
import * as UI_TEMPLATES from "./templates.js";
import * as Services from "./services.js";
import * as EventListeners from "./eventListeners.js";
import * as Helpers from "./helpers.js";

export function fetchNdisplayTableNames() {
  Services.getListOfTables().then((tables) => {
    $("#table-names").empty();
    tables.forEach((table) => {
      $("#table-names").append(UI_TEMPLATES.tableNameListTemplate(table));
    });
    EventListeners.handleTableDeleteButton();
  });
}

export function insertTableNameInSidebar(tableName) {
  $("#table-names").append(UI_TEMPLATES.tableNameListTemplate({ tableName, entries: 0 }));
  EventListeners.handleTableDeleteButton();

}

export function fetchNdisplayTableData(tableName) {
  Services.getTableData(tableName).then(({ tableData, tableSchema }) => {
    $("#table-data").empty();

    if (tableData.length == 0) {
      $("#table-data").html(`<h6 class="text-center mt-4">No data found in ${tableName} table</h6>`);
      return;
    }

    const headers = tableSchema.length > 0 ? tableSchema : Object.keys(tableData[0]);

    if (headers[0].toLocaleLowerCase() != "id") {
      headers.unshift("#");
    }

    let tableHeader = "<th style='width: 100px'></th>";
    tableHeader += headers.map((header) => UI_TEMPLATES.tableHeaderTemplate(UTILS.capitalizeFirstLetter(header))).join("");
    const tableRows = tableData.map((rowdata, idx) => UI_TEMPLATES.tableRowTemplate(rowdata, headers, idx)).join("");
    const table = UI_TEMPLATES.tableTemplate({ tableHeader, tableRows });
    $("#table-data").html(table);

    EventListeners.handleDeleteRowButton();
    EventListeners.handleEditRowButton();
  });
}

export function populateSchemaInModal(schema, initial = false, values = null, deleteFieldOption=true) {
  if (initial) {
    $("#add-row-form-body").empty();
  }
  const formElements = schema.map((key) => {
    return UI_TEMPLATES.formElementTemplate({
      label: Helpers.capitalizeFirstLetter(key),
      id: Helpers.generateId(key),
      placeholder: Helpers.generatePlaceholder(key),
      value: values ? values[key] : "",
      deleteFieldOption,
    });
  });

  $("#add-row-form-body").append(formElements.join(""));
}
