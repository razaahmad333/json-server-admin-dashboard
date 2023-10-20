import * as Actions from "./actions.js";
import * as UI_Helpers from "./ui_helpers.js";
import * as Helpers from "./helpers.js";
import * as Utils from "./utils.js";

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
    if (!tableName) {
      return;
    }
    UI_Helpers.fetchNdisplayTableData(tableName);
  });
}

export function handleAddNewRowButton() {
  Utils.createActionForButton("#open-add-row-modal-button", Actions.populateSchema);
  Utils.createActionForButton("#add-row-form [type='submit']", handleCreateEditRowAction);
}

export function handleCreateEditRowAction(onStart, onSuccess, onError, $button) {
  const action = $button.data("id");
  console.log(action);
  if (action === "edit") {
    Actions.editRow(onStart, onSuccess, onError, $button);
  } else {
    Actions.addRow(onStart, onSuccess, onError, $button);
  }
}

export function handleAddNewColumnButton() {
  const $addFieldBlock = $("#add-field-block");
  $addFieldBlock.find("button").on("click", () => {
    const $fieldName = $addFieldBlock.find("input").val();
    if ($fieldName) {
      UI_Helpers.populateSchemaInModal([$fieldName]);
      $addFieldBlock.find("input").val("");
    }
  }); 
}

export function handleDeleteRowButton() {
  Utils.createActionForButton(".delete-row-button", Actions.deleteRow);
}

export function handleEditRowButton() {
  Utils.createActionForButton(".edit-row-button", Actions.populateEditRowModal);
}
