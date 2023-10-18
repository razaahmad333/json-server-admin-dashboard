import * as Services from "./services.js";
import * as UI_Helpers from "./ui_helpers.js";
import * as Helpers from "./helpers.js";

export function baseAction(data, service, onStart, onSuccess, onError) {
  onStart();
  service(data)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onError(err.msg);
    });
}

export const createTable = (onStart, onSuccess, onError) => {
  const $tableInput = $("#new-table-create-block input");
  const tableName = $tableInput.val();
  if (tableName) {
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
  }
};

export const deleteTable = (onStart, onSuccess, onError, $button) => {
  const tableName = $button.data("id");
  if (tableName) {
    baseAction(
      tableName,
      Services.deleteTable,
      () => {
        onStart(`Deleting ${tableName} table...`);
      },
      () => {
        onSuccess("Table deleted successfully!");
        $button.closest(".list-group-item").remove();
      },
      () => {
        onError(`Failed to delete ${tableName} table!`);
      }
    );
  }
};

export function populateSchema(tableName, { onStart, onSuccess, onError }) {
  baseAction(
    tableName,
    Services.getTableSchema,
    () => {
      onStart(`Fetching ${tableName} schema...`);
    },
    (schema) => {
      onSuccess("Schema fetched successfully!", schema);
    },
    () => {
      onError(`Failed to fetch ${tableName} schema!`);
    }
  );
}

export function addRow({ tableName, values }, { onStart, onSuccess, onError }) {
  baseAction(
    { tableName, values },
    Services.addRow,
    () => {
      onStart(`Adding row to ${tableName} table...`);
    },
    () => {
      onSuccess("Row added successfully!");
    },
    () => {
      onError(`Failed to add row to ${tableName} table!`);
    }
  );
}

export const deleteRow = (onStart, onSuccess, onError, $button) => {
  const rowId = $button.data("id");
  const tableName = Helpers.getTableNameFromUrl();
  if (tableName && rowId) {
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
  }
};

export const populateEditRowModal = (onStart, onSuccess, onError, $button) => {
  onStart();
  const row = $button
    .closest("tr")
    .find("td")
    .toArray()
    .reduce((acc, td) => {
      const $td = $(td);
      const key = $td.data("id");
      const value = $td.text();
      if(key && value){
        acc[key] = value.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
      }
      return acc;
    }, {});
  const index = $button.closest("tr").index();

  const $addRowModal = $("#add-row-modal");
  $addRowModal.modal("show");
  $addRowModal.find(".modal-title").text("Edit Row");
  $("#add-row-form [type='submit']").text("Save Changes").attr("data-id", "edit")
  // $("#add-row-form").
  UI_Helpers.populateSchemaInModal(Object.keys(row), true, row, false);
  onSuccess();

};

export const editRow = (onStart, onSuccess, onError) => {
  const tableName = Helpers.getTableNameFromUrl();
  const data = new FormData($("#add-row-form")[0]);
  const values = Object.fromEntries(data.entries());
  const rowId = $("#add-row-form").data("id");
  if (tableName && rowId) {
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
      () => {
        onError(`Failed to edit row from ${tableName} table!`);
      }
    );
  }
}