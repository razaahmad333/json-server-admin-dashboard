import * as Services from "./services.js";

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

export function createTable(tableName, { onStart, onSuccess, onError }) {
  baseAction(
    tableName,
    Services.createNewTable,
    () => {
      onStart(`Creating ${tableName} table...`);
    },
    () => {
      onSuccess("Table created successfully!");
    },
    onError
  );
}

export function deleteTable(tableName, { onStart, onSuccess, onError }) {
  baseAction(
    tableName,
    Services.deleteTable,
    () => {
      onStart(`Deleting ${tableName} table...`);
    },
    () => {
      onSuccess("Table deleted successfully!");
    },
    () => {
      onError(`Failed to delete ${tableName} table!`);
    }
  );
}

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
