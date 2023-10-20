import * as ICONS from "./icons.js";

export const tableNameListTemplate = ({ tableName, entries }) => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
        <a href="#${tableName}"  class="table-name">${tableName}</a>
        <div>
          <span class="badge bg-primary rounded-pill">${entries}</span>
          <button class="btn btn-sm text-danger delete-table-button" data-id="${tableName}">
            ${ICONS.trash}  
          </button>
        </div>
    </div>
    `;

export const tableHeaderTemplate = (tableHeader) => ` <th scope="col">${tableHeader}</th> `;

export const tableRowTemplate = (rowdata, headers, idx) => `
    <tr> 
        <td class="d-flex  align-items-center ">
            <input type="checkbox">
            <button type="button" class="btn hover-danger btn-sm delete-row-button " data-id=${ idx}>
                ${ICONS.trash}
            </button>
            <button type="button" class="btn hover-warning btn-sm edit-row-button" data-id=${ idx} >
                ${ICONS.edit}
            </button>
        </td>
        ${headers
          .map(
            (field, i) =>
              `<td ${i == 0 ? "scope='row'" : ""} data-id='${field}'>
                ${rowdata[field] || (i === 0 ? idx + 1 : "-")}
            </td>`
          )
          .join("")} 
    </tr> `;

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

export const toastTemplate = (message, bg = "primary") => `
    <div class="toast toast_custom_style" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <div class="bg-${bg} toast_square"></div>
          <strong class="me-auto">json-server admin dashboard</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    </div>
`;

export const formElementTemplate = ({ label, id, type = "text", placeholder, value = "", deleteFieldOption = true }) => `
    <div class=" mb-3">
        <label for="${id}" class="form-label">${label}</label>
        <div class="input-group">
            <input type="${type}" class="form-control" id="${id}" name="${id}" aria-describedby="table-name-help" placeholder="${placeholder}" value="${value}">
        </div>
    </div>
`;
// <div id="table-name-help" class="form-text">Enter the table name to add a row.</div>
// ${deleteFieldOption ? ` <button type="button" class="btn btn-outline-secondary pb-2">${ICONS.trash}</button>` : ""}
