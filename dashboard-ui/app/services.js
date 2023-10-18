export const getListOfTables = async () => {
  const url = `/api/databaseSummary`;
  return fetch(url).then((response) => response.json());
};

export const createNewTable = (tableName) => {
  const url = `/api/createTable/${tableName}`;
  return fetch(url, { method: "POST" });
};

export const getTableData = async (tableName) => {
  const url = `/api/getTable/${tableName}`;
  return fetch(url).then((response) => response.json());
};

export const deleteTable = async (tableName) => {
  const url = `/api/deleteTable/${tableName}`;
  return fetch(url, { method: "DELETE" });
};

export const getTableSchema = async (tableName) => {
  const url = `/api/getTableSchema/${tableName}`;
  return fetch(url).then((response) => response.json());
};

export const addRow = async ({ tableName, values }) => {
  const url = `/api/addRow/${tableName}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const deleteRow = async ({ tableName, rowId }) => {
  const url = `/api/deleteRow/${tableName}/${rowId}`;
  return fetch(url, { method: "DELETE" });
};

export const editRow = async ({ tableName, rowId, values }) => {
  const url = `/api/editRow/${tableName}/${rowId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};