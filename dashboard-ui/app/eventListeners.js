import * as Actions from "./actions.js";
import * as UI_Helpers from "./ui_helpers.js";

export function handleTableDeleteButton() {
  $(".delete-table-button").on("click", function (e) {
    const tableName = $(this).data("id");
    if (!confirm(`Are you sure you want to delete ${tableName} table?`)) {
      return;
    }
    Actions.deleteTable(tableName);
  });
}

export function handleNewTableCreateButton() {
  $("#new-table-create-block button").on("click", () => {
    const tableName = $("#new-table-create-block input").val();
    if (tableName) {
      Actions.createTable(tableName);
    }
  });
}

export function trackTableSelectionInSidebar() {
  $(window).on("hashchange", () => {
    const tableName = Helpers.getTableNameFromUrl();
    UI_Helpers.fetchNdisplayTableData(tableName);
  });
}
