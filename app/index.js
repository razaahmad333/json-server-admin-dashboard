import { capitalizeFirstLetter } from "./utils.js";
import {
  tableNameListTemplate,
  tableHeaderTemplate,
  tableRowTemplate,
} from "./templates.js";
import { DATABASE_NAME } from "./config.js";
import { getListOfTables, createNewTable, getTableData } from "./services.js";

init();

let selectedTable = "";

function init() {
  displayDatabaseName();
  fetchNdisplayTableNames();
  trackTableSelectionInSidebar();
  handleNewTableCreation();
}

function handleNewTableCreation() {
  $("#new-table-create-block button").on("click", () => {
    const tableName = $("#new-table-create-block input").val();
    if (tableName) {
      createNewTable(tableName);
    }
  });
}

function displayDatabaseName() {
  $("#database-name").text(DATABASE_NAME || "Database");
}

function fetchNdisplayTableNames() {
  getListOfTables().then((tables) => {
    $("#table-names").empty();
    tables.forEach((table) => {
      $("#table-names").append(tableNameListTemplate(table));
    });

    if(tables.length > 0){
        selectedTable = tables[0].tableName;
        fetchNdisplayTableData(selectedTable);
    }

  });
}

function trackTableSelectionInSidebar() {
  $(window).on("hashchange", () => {
    const tableName = window.location.hash.substring(1);
    fetchNdisplayTableData(tableName);
  });
}

function fetchNdisplayTableData(tableName) {
  getTableData(tableName).then((tableData) => {
    $("#table-data thead").empty();

    if (tableData.length == 0) {
      $("#table-data").html("<p class='text-center'>No Data Found</p>");
      return;
    }

    const headers = Object.keys(tableData[0]);

    if (headers[0] != "id") {
      headers.unshift("#");
    }

    const tableHeader = headers
      .map((header) => tableHeaderTemplate(capitalizeFirstLetter(header)))
      .join("");

    const tableRows = tableData
      .map((row, index) => {
        const rowValues = Object.values(row);
        if (rowValues[0] != "id") {
          rowValues.unshift(index + 1);
        }
        return tableRowTemplate(rowValues);
      })
      .join("");

    $("#table-data").html("<thead></thead><tbody></tbody>");
    $("#table-data thead").append(tableHeader);
    $("#table-data tbody").append(tableRows);
  });
};



function handleNewRowAddition(){
    
}