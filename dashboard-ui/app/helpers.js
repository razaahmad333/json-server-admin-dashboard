export const getTableNameFromUrl = () => window.location.hash.substring(1);

export const generateId = (schemaItem) => schemaItem.split(" ").join("-").toLowerCase();

export const generatePlaceholder = (schemaItem) => "enter " + schemaItem.toLowerCase();

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValid(values) {
  for (let key in values) {
    if (values[key]) {
      return true;
    }
  }
  return false;
}

export function getCompositeKey(rowData, index) {
  const idField = Object.keys(rowData).find(key => ['id', '_id'].includes(key.toLowerCase())) || 'index';
  const keys = Object.keys(rowData).filter(key => key !== idField);
  const nextFieldData = keys.length > 0 ? rowData[keys[0]] : "";
  const idFieldData = idField==='index'?index:rowData[idField];
  return idFieldData + "-" + nextFieldData;
}
