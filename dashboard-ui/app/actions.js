import * as Services from "./services.js";
import * as UI_Helpers from "./ui_helpers.js";
import * as Helpers from "./helpers.js";

export function baseAction(data, service, onStart, onSuccess, onError) {
  onStart();
  service(data).then((res) => {
    if (res.status && res.status !== 200) {
      onError(res.msg);
      return;
    }
    onSuccess(res);
  });
}

export const createTable = (onStart, onSuccess, onError) => {
  const $tableInput = $("#new-table-create-block input");
  const tableName = $tableInput.val();
  if (!tableName) {
    return onError("Invalid data!");
  }
  baseAction(
    tableName,
    Services.createNewTable,
    () => {
      onStart(`Creating ${tableName} table...`);
    },
    () => {
      onSuccess("Table created successfully!");
      $tableInput.val("");
      UI_Helpers.insertTableNameInSidebar(tableName);
    },
    onError
  );
};

export const deleteTable = (onStart, onSuccess, onError, $button) => {
  const tableName = $button.data("id");
  if (!tableName) {
    return onError("Invalid data!");
  }
  baseAction(
    tableName,
    Services.deleteTable,
    () => {
      onStart(`Deleting ${tableName} table...`);
    },
    () => {
      onSuccess("Table deleted successfully!");
      if(window.location.hash === `#${tableName}`) {
        window.location.hash = "";
      }
      $button.closest(".list-group-item").remove();
    },
    () => {
      onError(`Failed to delete ${tableName} table!`);
    }
  );
};

export const populateSchema = (onStart, onSuccess, onError) => {
  const tableName = Helpers.getTableNameFromUrl();
  $("#add-row-form").find("[type='submit']").text("Save").attr("data-id", "save");


  baseAction(
    tableName,
    Services.getTableSchema,
    () => {
      onStart(`Fetching ${tableName} schema...`);
    },
    (schema) => {
      onSuccess("Schema fetched successfully!");
      UI_Helpers.populateSchemaInModal(schema, true);
    },
    (msg) => {
      onError(msg || "Failed to fetch schema!");
    }
  );
};

export const addRow = (onStart, onSuccess, onError) => {
  const tableName = Helpers.getTableNameFromUrl();
  const data = new FormData($("#add-row-form")[0]);
  const values = Object.fromEntries(data.entries());

  if (!Helpers.isValid(values)) {
    return onError("Invalid data!");
  }

  baseAction(
    { tableName, values },
    Services.addRow,
    () => {
      onStart(`Adding row to ${tableName} table...`);
    },
    () => {
      onSuccess("Row added successfully!");
      UI_Helpers.fetchNdisplayTableData(tableName);
      $("#add-row-form").trigger("reset");
    },
    () => {
      onError(`Failed to add row to ${tableName} table!`);
    }
  );
};

export const deleteRow = (onStart, onSuccess, onError, $button) => {
  const rowId = $button.data("id");
  const tableName = Helpers.getTableNameFromUrl();
  if (!tableName) {
    return onError("Invalid data!");
  }

  baseAction(
    { tableName, rowId },
    Services.deleteRow,
    () => {
      onStart(`Deleting row from ${tableName} table...`);
    },
    () => {
      onSuccess("Row deleted successfully!");
      $button.closest("tr").remove();
    },
    () => {
      onError(`Failed to delete row from ${tableName} table!`);
    }
  );
};

export const populateEditRowModal = (onStart, onSuccess, onError, $button) => {
  onStart();
  $("#add-row-form [type='submit']").text("Save Changes").attr("data-id", "edit");

  const row = $button
    .closest("tr")
    .find("td")
    .toArray()
    .reduce((acc, td) => {
      const $td = $(td);
      const key = $td.data("id");
      const value = $td.text();
      if (key && value && key !== "#") {
        acc[key] = value.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
      }
      return acc;
    }, {});
  const index = $button.data("id");
  localStorage.setItem("rowIndex", index);

  const $addRowModal = $("#add-row-modal");
  $addRowModal.modal("show");
  $addRowModal.find(".modal-title").text("Edit Row");
  UI_Helpers.populateSchemaInModal(Object.keys(row), true, row, false);
  onSuccess();
};

export const editRow = (onStart, onSuccess, onError) => {
  console.log("editRow clicked");
  const tableName = Helpers.getTableNameFromUrl();
  const data = new FormData($("#add-row-form")[0]);
  const values = Object.fromEntries(data.entries());
  const rowId = localStorage.getItem("rowIndex");

  if (!tableName) {
    return onError("Invalid data!");
  }

  baseAction(
    { tableName, rowId, values },
    Services.editRow,
    () => {
      onStart(`Editing row from ${tableName} table...`);
    },
    () => {
      onSuccess("Row edited successfully!");
      $("#add-row-modal").modal("hide");
      $("#add-row-form").trigger("reset");
      UI_Helpers.fetchNdisplayTableData(tableName);
    },
    (msg) => {
      onError(msg || `Failed to edit row from ${tableName} table!`);
    }
  );
};
