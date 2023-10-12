import { JSON_SERVER_BASE_URL } from "./config.js";

export const getListOfTables = async () => {
  const url = `/api/databaseSummary`;
  const data = await fetch(url).then((response) => response.json());
  return data;
};

export const createNewTable = (tableName) => {
  const url = `/api/createTable/${tableName}`;
  return fetch(url, { method: "POST" });
};

export const getTableData = async (tableName) => {
  const url = `/api/getTable/${tableName}`;
  const tableData = await fetch(url).then((response) => response.json());
  return tableData;
};

export const deleteTable = async (tableName) => {
  const url = `/api/deleteTable/${tableName}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response;
};
