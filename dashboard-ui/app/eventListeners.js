import * as Actions from "./actions.js";
import * as UI_Helpers from "./ui_helpers.js";
import * as Helpers from "./helpers.js";
import * as Utils from "./utils.js";
import { createAddRowHandler } from "./addNewRow.js";

export function handleNewTableCreateButton() {
  Utils.createActionForButton("#new-table-create-block button", Actions.createTable);
}

export function handleTableDeleteButton() {
  Utils.createActionForButton(".delete-table-button", Actions.deleteTable);
}



export function trackTableSelectionInSidebar() {
  const $tableNameElement = $("#table-name");

  if (Helpers.getTableNameFromUrl()) {
    $tableNameElement.text(Helpers.getTableNameFromUrl());
    UI_Helpers.fetchNdisplayTableData(Helpers.getTableNameFromUrl());
  }

  $(window).on("hashchange", () => {
    const tableName = Helpers.getTableNameFromUrl();
    $tableNameElement.text(tableName || "No table selected");
    UI_Helpers.fetchNdisplayTableData(tableName);
  });
}

export function handleAddNewRowButton() {
  const addRowHandler = createAddRowHandler("#add-row-form");

  const action = (onStart, onSuccess, onError) => {
    const tableName = Helpers.getTableNameFromUrl();
    addRowHandler.setCurrentTable(tableName);
    Actions.populateSchema(tableName, {
      onStart,
      onSuccess: (msg, schema) => {
        onSuccess(msg);
        addRowHandler.extendSchemaInBulk(schema);
      },
      onError,
    });
  };

  Utils.createActionForButton("#open-add-row-modal-button", action);

  const addRowAction = (onStart, onSuccess, onError) => {
    const tableName = addRowHandler.currentTable;
    const data = new FormData($("#add-row-form")[0]);
    const values = Object.fromEntries(data.entries());

    if (!Helpers.isValid(values)) {
      onError(null, "Invalid data!");
      return;
    }

    Actions.addRow(
      { tableName, values },
      {
        onStart,
        onSuccess: (msg) => {
          onSuccess(msg);
          UI_Helpers.fetchNdisplayTableData(tableName);
          addRowHandler.reset();
        },
        onError,
      }
    );
  };

  Utils.createActionForButton("#add-row-form [type='submit'] [data-id='save']", addRowAction);
}

export function handleDeleteRowButton() {
  Utils.createActionForButton(".delete-row-button", Actions.deleteRow);
}

export function handleEditRowButton() {
  Utils.createActionForButton(".edit-row-button", Actions.populateEditRowModal);

  Utils.createActionForButton("#add-row-form [type='submit'] [data-id='edit']", Actions.editRow);
}
