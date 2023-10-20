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
