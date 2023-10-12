import * as UTILS from "./utils.js";
import * as Helpers from "./helpers.js"
import * as UI_TEMPLATES from "./templates.js";
import { DATABASE_NAME } from "./config.js";
import * as Services from "./services.js";
import * as EventListeners from "./eventListeners.js";

let selectedTable = "";

export function fetchNdisplayTableNames() {
  Services.getListOfTables().then((tables) => {
    $("#table-names").empty();
    tables.forEach((table) => {
      $("#table-names").append(UI_TEMPLATES.tableNameListTemplate(table));
    });

    EventListeners.handleTableDeleteButton();

    if (tables.length > 0) {
      selectedTable = tables[0].tableName;
      fetchNdisplayTableData(selectedTable);
    }
  });
}

export function fetchNdisplayTableData(tableName) {
  Services.getTableData(tableName).then((tableData) => {
    $("#table-data thead").empty();

    if (tableData.length == 0) {
      $("#table-data").html("<p class='text-center'>No Data Found</p>");
      return;
    }

    const headers = Object.keys(tableData[0]);
    if (headers[0].toLocaleLowerCase() != "id") {
      headers.unshift("#");
    }

    const tableHeader = headers
      .map((header) =>
        UI_TEMPLATES.tableHeaderTemplate(UTILS.capitalizeFirstLetter(header))
      )
      .join("");

    const tableRows = tableData
      .map((row, index) => {
        const rowValues = Object.values(row);
        if (headers[0] === "#") {
          rowValues.unshift(index + 1);
        }
        return UI_TEMPLATES.tableRowTemplate(rowValues);
      })
      .join("");

    const table = UI_TEMPLATES.tableTemplate({ tableHeader, tableRows });
    $("#table-data").html(table);
  });
}

export function displayDatabaseName() {
  $("#database-name").text(DATABASE_NAME || "Database");
}

function handleNewRowAddition() {}
