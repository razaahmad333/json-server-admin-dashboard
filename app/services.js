import { JSON_SERVER_BASE_URL } from "./config.js"

export const getListOfTables = async () => {
    const url = `${JSON_SERVER_BASE_URL}/db`;
    const db = await fetch(url).then((response) => response.json());
    delete db.__metadata__;
    return Object.keys(db).reduce((acc, tableName) => {
        acc.push({ tableName: tableName, entries: db[tableName].length });
        return acc;
      }, [])
}

export const createNewTable = async (tableName) => {
  const url = `${JSON_SERVER_BASE_URL}/${tableName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([]),
  });
  if (response.ok) {
    window.location.reload();
  }
}

export const getTableData = async (tableName) => {
  const url = `${JSON_SERVER_BASE_URL}/${tableName}`;
  const tableData = await fetch(url).then((response) => response.json());
  return tableData;
}