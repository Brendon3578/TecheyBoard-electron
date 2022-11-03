/*
  Links:
  https://learn.microsoft.com/pt-br/azure/mysql/single-server/connect-nodejs
  https://programatically.com/how-to-create-crud-api-with-nodejs-mysql/
  https://www.isarubim.com/posts/construindo-um-simples-projeto-mvc-do-zero-com-javascript
*/

/**
 * @typedef {import('../../../types/type').lab} lab
 */

/**
 * @param {lab} lab
 */
function createLabItemOnUseList(lab) {
  const maintenanceLabListEl = document.getElementById("lab-maintenance");
  const labListEl = document.getElementById("lab-list");

  if (lab.status == "NORMAL") {
    labListEl.innerHTML += `
    <div class="keys-in-use__title">${lab.labName}</div>
    <ul class="keys-in-use__list" id="keys-in-use-keys-lab-${lab.id}">
      <li class="keys-in-use__nothing list-is-blank">
        Nenhuma chave em uso para hoje
      </li>
    </ul>
    `;
  } else if (lab.status == "MANUNTENCAO") {
    maintenanceLabListEl.innerHTML += `
    <div class="keys-in-use__item key-maintenance">
      ${lab.labName}
    </div>
    `;
  }
}

/**
 * @param {lab} lab
 */
function createLabOptionOnSelectInput(lab) {
  const selects = document.getElementsByName("lab");

  selects.forEach((select) => {
    select.innerHTML += `<option value="${lab.id}" name="${lab.labName}">${lab.labName}</option>`;
  });
}

export { createLabItemOnUseList, createLabOptionOnSelectInput };
