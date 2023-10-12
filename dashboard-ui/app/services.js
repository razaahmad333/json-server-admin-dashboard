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
