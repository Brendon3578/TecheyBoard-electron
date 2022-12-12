/**
 * @typedef {import('../pages/types/type.js').scheduling} scheduling
 * @typedef {import('../pages/types/type.js').room} room
 * @typedef {import('../pages/types/type.js').user} user
 */

import { capitalizeString, formatDate } from "../scripts/utils.js";

/**
 * @param {HTMLTableRowElement} parentEl É o elemento pai (no caso elemento tbody), no qual será adicionado as linhas do agendamento
 * @param {scheduling} schedule É o agendamento
 */
function createScheduleOnTableRow(parentEl, schedule) {
  const parsedScheduleKeyTakenHour = formatDate(
    schedule.scheduledTime.keyTakenHour,
    "HH:MM -withoutZero"
  );
  const parsedScheduleKeyReturnHour = formatDate(
    schedule.scheduledTime.keyReturnedHour,
    "HH:MM -withoutZero"
  );

  let statusLabelString = "";
  let classesAmountString = "";
  const classesAmountLength = schedule.scheduledTime.classesAmount.length;

  for (let i = 0; i < classesAmountLength; i++) {
    let classNumber = schedule.scheduledTime.classesAmount[i];

    if (i == classesAmountLength - 2) {
      classesAmountString += `${classNumber}&ordf; e `;
    } else if (i == classesAmountLength - 1) {
      classesAmountString += `${classNumber}&ordf; aula`;
    } else {
      classesAmountString += `${classNumber}&ordf;,`;
    }
  }

  let statusCellClassNames = "cell__status";
  if (schedule.status == "SCHEDULED") {
    statusCellClassNames += " cell__status--able";
    statusLabelString = "Agendado";
  } else if (schedule.status == "USING") {
    statusCellClassNames += " cell__status--disabled";
    statusLabelString = "Usando";
  }

  parentEl.innerHTML += `
    <tr class="table__body__row" id="${schedule.id}">
      <td class="table__body__cell table__body__cell--input">
        <!-- USING ou SCHEDULED -->
        <input
          type="radio"
          name="schedule-row"
          class="cell__radio-input"
          value="${schedule.id}-${schedule.status}"
          onchange="focusScheduleRow(event)"
        />
      </td>
      <th
        scope="row"
        class="table__body__cell table__body__cell--header"
      >
        <span> ${schedule.room.name} </span>
      </th>
      <td class="table__body__cell">
        <span class="${statusCellClassNames}">
          ${capitalizeString(statusLabelString)}
        </span>
      </td>
      <td class="table__body__cell">
        ${formatDate(schedule.scheduledTime.keyTakenHour, "DD/MM/YYYY")} -
        das ${parsedScheduleKeyTakenHour} até ${parsedScheduleKeyReturnHour}
      </td>
      <td class="table__body__cell">${classesAmountString}</td>
    </tr>`;
}

/**
 * @param {HTMLTableRowElement} parentEl É o elemento pai (no caso elemento tbody), no qual será adicionado as linhas do agendamento
 */
function createMessageAboutNoSchedulesFound(parentEl) {
  parentEl.innerHTML += `
  <tr class="table__body__row">
    <td class="table__body__cell table__body__cell--no-items" colspan="5">
      <span>
        Nenhum agendamento criado, experimente 
        <a href="../schedule-key/schedule-key.html" class="link" title="Redirecionar para Agendar Chave">
          Agendar uma chave de sala
        </a>
      </span>
    </td>
  </tr>
  `;
}

/**
 * @param {HTMLTableRowElement} parentEl É o elemento pai (no caso elemento tbody),
 *  no qual será adicionado as linhas da sala
 * @param {room} room É a sala
 */
function createRoomOnTableRow(parentEl, room) {
  let statusCellClassNames = "cell__status";
  let statusLabelString = "";

  if (room.status == "MAINTENANCE") {
    statusCellClassNames += " cell__status--warning";
    statusLabelString = "Em Manutenção";
  } else if (room.status == "NORMAL") {
    statusCellClassNames += " cell__status--able";
    statusLabelString = "Normal";
  }

  parentEl.innerHTML += `
  <tr class="table__body__row" id="${room.id}">
  <td class="table__body__cell table__body__cell--input">
    <input
      type="radio"
      name="room-row"
      class="cell__radio-input"
      value="${room.id}-${room.status}-${room.roomName}"
      onchange="focusRoomRow(event)"
    />
  </td>
  <td class="table__body__cell"><b>${room.id}</b></td>

  <th
    scope="row"
    class="table__body__cell table__body__cell--header"
  >
    <span> ${room.roomName} </span>
  </th>
  <td class="table__body__cell">
    <span class="${statusCellClassNames}">
      ${capitalizeString(statusLabelString)}
    </span>
  </td>
</tr>`;
}

/**
 * @param {HTMLTableRowElement} parentEl É o elemento pai (no caso elemento tbody), no qual será adicionado as linhas do agendamento
 */
function createMessageAboutNoRoomsFound(parentEl) {
  parentEl.innerHTML += `
  <tr class="table__body__row">
    <td class="table__body__cell table__body__cell--no-items" colspan="4">
      <span>
        Nenhuma sala cadastrada, experimente 
        <label for="create-new-lab-input" class="link">
          Cadastrar uma nova Sala
        </a>
      </label>
    </td>
  </tr>
  `;
}

/**
 * @param {HTMLTableRowElement} parentEl É o elemento pai (no caso elemento tbody),
 *  no qual será adicionado as linhas da sala
 * @param {user} user É a Usuário
 */
function createUserOnTableRow(parentEl, user) {
  parentEl.innerHTML += `
  <tr class="table__body__row" id="${user.id}">
    <td class="table__body__cell table__body__cell--input">
      <input
        type="radio"
        name="user-row"
        class="cell__radio-input"s
        value="${user.id}"
        onchange="focusUserRow(event)"
      />
    </td>
    <td class="table__body__cell"><span>${user.id}</span></td>
    <td class="table__body__cell"><span>${user.registration}</span></td>
    <td class="table__body__cell"><span>${user.name}</span></td>
    <td class="table__body__cell"><span>${user.email}</span></td>
    <td class="table__body__cell"><span>${user.contact}</span></td>
    <td class="table__body__cell"><span>${user.role}</span></td>
  </tr>`;
}

export {
  createScheduleOnTableRow,
  createMessageAboutNoSchedulesFound,
  createRoomOnTableRow,
  createMessageAboutNoRoomsFound,
  createUserOnTableRow,
};
