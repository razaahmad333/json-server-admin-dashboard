import * as UI_Helpers from "./ui_helpers.js";

export function createAddRowHandler(formSelector) {
  let schema = [];
  let currentTable = null;


  const extendSchema = (newField) => {
    schema = [...schema, newField];
    UI_Helpers.populateSchemaInModal([newField]);
  };

  const extendSchemaInBulk = (newFields) => {
    schema = [...schema, ...newFields];
    UI_Helpers.populateSchemaInModal(newFields, true);
  };

  const setCurrentTable = (tableName) => {
    currentTable = tableName;
  };

  const reset = () => {
    schema = [];
    currentTable = null;
    $(formSelector).trigger("reset");
  };

  const $addFieldBlock = $("#add-field-block");
  $addFieldBlock.find("button").on("click", () => {
    const $fieldName = $addFieldBlock.find("input").val();
    if ($fieldName) {
      extendSchema($fieldName);
      $addFieldBlock.find("input").val("");
    }
  });

  $("#close-add-row-modal-button").on("click", () => {
    reset();
  });

  return {
    get schema() {
      return schema;
    },
    get currentTable() {
      return currentTable;
    },
    extendSchema,
    extendSchemaInBulk,
    setCurrentTable,
    reset,
  };
}
