import * as Services from "./services.js";
import * as UI_Helpers from "./ui_helpers.js";


export function createTable(tableName) { 
    Services.createNewTable(tableName).then(() => {
      UI_Helpers.fetchNdisplayTableNames();
    });
}

export function deleteTable(tableName) {
  Services.deleteTable(tableName).then(() => {
    UI_Helpers.fetchNdisplayTableNames();
  });
}

