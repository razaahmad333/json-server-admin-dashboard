import * as ICONS from "./icons.js";

export const tableNameListTemplate = ({ tableName, entries }) => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
        <a href="#${tableName}"  class="table-name">${tableName}</a>
        <div>
          <span class="badge bg-primary rounded-pill">${entries}</span>
          <button class="btn btn-sm text-danger delete-table-button" data-id="${tableName}">
            ${ICONS.trashIcon}  
          </button>
        </div>
    </div>
    `;

export const tableHeaderTemplate = (tableHeader) =>
  ` <th scope="col">${tableHeader}</th> `;

export const tableRowTemplate = (tableRow) =>
  ` <tr> ${tableRow
    .map((row, i) => `<td ${i == 0 ? "scope='row'" : ""}  >${row}</td>`)
    .join("")} </tr> `;

export const tableTemplate = ({ tableHeader, tableRows }) => `
    <thead>
        <tr>
            ${tableHeader}
        </tr>
    </thead>
    <tbody>
        ${tableRows}
    </tbody>
    `;
