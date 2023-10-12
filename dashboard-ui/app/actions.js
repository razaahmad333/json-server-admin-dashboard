import * as Services from "./services.js";
import { fetchNdisplayTableNames } from "./ui_helpers.js";


export function createTable(tableName) { 
    Services.createNewTable(tableName).then(() => {
        fetchNdisplayTableNames();
    });
}

export function deleteTable(tableName) {
  Services.deleteTable(tableName).then(() => {
    fetchNdisplayTableNames();
  });
}

