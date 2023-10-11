export const tableNameListTemplate = ({ tableName, entries }) =>
  `
    <a href="#${tableName}" class="list-group-item d-flex justify-content-between align-items-center">
        <span class="table-name">${tableName}</span>
        <span class="badge bg-primary rounded-pill">${entries}</span>
    </a>
    `;

export const tableHeaderTemplate = (tableHeader) =>
  ` <th scope="col">${tableHeader}</th> `;

export const tableRowTemplate = (tableRow) =>
  ` <tr> ${tableRow.map((row, i) => `<td ${i==0 ? "scope='row'" : "" }  >${row}</td>`).join("")} </tr> `;
