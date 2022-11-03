import { today } from "./scheduling.js";
import { formatDate } from "../../../../scripts/utils.js";

/**
 * @typedef {import('../../../types/type').scheduledKey} scheduledKey
 */

/**
 * Essa função vai criar no accordion de chaves agendada, os itens de chaves agendadas,
 * no qual o usuário pode retirar a chave agendada ou deletar o agendamento da chave.
 *
 * @param {scheduledKey} key
 */

function createNewKeyItemOnSchedulingAccordion(key) {
  const keyListEl = document.getElementById("key-list-scheduling");

  const keyTakenHourString = formatDate(
    key.scheduledTime.keyTakenHour,
    "HH:MM"
  );

  const keyReturnedHourString = formatDate(
    key.scheduledTime.keyReturnedHour,
    "HH:MM"
  );

  const scheduledDate = formatDate(
    key.scheduledTime.keyTakenHour,
    "DD/MM/YYYY"
  );

  // lógica de não permitir retirar a chave agendada para amanhã, apenas a que está marcada para hoje
  const isScheduledDateToday =
    formatDate(key.scheduledTime.keyTakenHour, "YYYY-MM-DD") ==
    formatDate(today.date, "YYYY-MM-DD");

  keyListEl.innerHTML += `
  <li class="key__list__item" id="scheduling-key-${key.id}">
    <div class="icon">
      <i class="ph-desktop-tower ph-lg"></i>
    </div>
    <div class="description">
      <p>${key.lab.name}</p>
      <span>
        ${scheduledDate} - ${keyTakenHourString} - ${keyReturnedHourString}
      </span>
    </div>

    <div class="key__list__item__btns-list">
      <button
        class="key__list__item__btn btn-red"
        title="Cancelar agendamento de chave"
        onclick="deleteScheduledKey(${key.id})"
      >
        <i class="ph-trash ph-lg"></i>
      </button>

      ${
        isScheduledDateToday
          ? `
          <button
            class="key__list__item__btn btn-green"
            title="Retirar chave agendada"
            onclick="setScheduledKeyToTakenKey(${key.id})"
          >
            <i class="ph-arrow-u-up-right ph-lg"></i>
          </button>
          `
          : ""
      }
    </div>
  </li>`;

  updateNoItensListText(keyListEl);
}

function deleteKeyItemOnSchedulingAccordion(keyId) {
  const accordionKeyItemEl = document.getElementById(`scheduling-key-${keyId}`);

  if (accordionKeyItemEl != undefined || accordionKeyItemEl != null) {
    const accordionKeyListEl = accordionKeyItemEl.parentElement;

    accordionKeyListEl.removeChild(accordionKeyItemEl);
    updateNoItensListText(accordionKeyListEl);
  }
}

/**
 * Essa função vai criar dentro do sidebar esquerdo (chaves em uso) os itens das chaves
 * dos laboratórios que estão em uso.
 *
 * @param {scheduledKey} key
 */
function createKeyItemOnKeysInUseList(key) {
  // only create if the date of scheduled key is today

  const isScheduledKeyDateToday =
    formatDate(key.scheduledTime.keyReturnedHour, "YYYY-MM-DD") ==
    formatDate(today.date, "YYYY-MM-DD");

  if (isScheduledKeyDateToday == false) {
    return null;
  }

  const keyTakenHourString = formatDate(
    key.scheduledTime.keyTakenHour,
    "HH:MM"
  );

  const keyReturnedHourString = formatDate(
    key.scheduledTime.keyReturnedHour,
    "HH:MM"
  );

  const wasKeyTaken = key.status == "USANDO";

  const keysInUseLabSelector = "#keys-in-use-keys-lab-" + key.lab.id;

  const keysInUseLabListEl = document.querySelector(keysInUseLabSelector);

  const keyTitleInformation =
    `${key.lab.name} reservado à ${key.teacher.name}` +
    ` - ${keyTakenHourString} - ${keyReturnedHourString}`;

  let classesAmountString =
    key.scheduledTime.classesAmount.join("&ordf;, ") + "&ordf; aula";

  const classesAmountLength = key.scheduledTime.classesAmount.length;

  if (classesAmountLength == 2) {
    classesAmountString += "s";
  } else if (classesAmountLength > 2) {
    const firstScheduledClass = key.scheduledTime.classesAmount[0];
    const lastScheduledClass =
      key.scheduledTime.classesAmount[classesAmountLength - 1];

    classesAmountString = `${firstScheduledClass}&ordf;...${lastScheduledClass}&ordf; aulas`;
  }

  let keysInUseClassStyle = "keys-in-use__item";

  if (wasKeyTaken) {
    keysInUseClassStyle += " key-was-taken";
  }

  keysInUseLabListEl.innerHTML += `
  <li class="${keysInUseClassStyle}" title="${keyTitleInformation}" id="key-in-use-item-${
    key.id
  }">
    <span class="info">
      ${
        wasKeyTaken
          ? `<i class="ph-minus-circle ph-lg"></i>`
          : `<i class="ph-clock ph-lg"></i>`
      }
      ${classesAmountString}
    </span>
    <span>
      ${key.teacher.name}
    </span>
  </li>
  `;

  updateNoItensListText(keysInUseLabListEl);
}

const updateKeyItemStatusOnKeysInUseList = (keyId, status) => {
  if (status == "USANDO") {
    document
      .getElementById(`key-in-use-item-${keyId}`)
      .classList.add("key-was-taken");

    // atualizar o ícone do item de chave
    document.querySelector(`#key-in-use-item-${keyId} .info i`).classList =
      "ph-minus-circle ph-lg";
  }
};

function deleteKeyItemOnKeysInUseList(keyId) {
  const keyInUseListItemEl = document.getElementById(
    `key-in-use-item-${keyId}`
  );

  if (keyInUseListItemEl != undefined || keyInUseListItemEl != null) {
    const keyInUseListEl = keyInUseListItemEl.parentElement;

    keyInUseListEl.removeChild(keyInUseListItemEl);
    updateNoItensListText(keyInUseListEl);
  }
}

function createNewKeyItemOnTakenAccordion(takenKey) {
  const takenKeyListEl = document.getElementById("key-list-taken");

  const keyTakenHourString = formatDate(
    takenKey.scheduledTime.keyTakenHour,
    "HH:MM"
  );

  const keyReturnedHourString = formatDate(
    takenKey.scheduledTime.keyReturnedHour,
    "HH:MM"
  );

  const scheduledDate = formatDate(
    takenKey.scheduledTime.keyTakenHour,
    "DD/MM/YYYY"
  );

  takenKeyListEl.innerHTML += `
  <li
    class="key__list__item"
    id="taken-key-${takenKey.id}"
  >
    <div class="icon icon-red">
      <i class="ph-desktop-tower ph-lg"></i>
    </div>
    <div class="description">
      <p>EM USO: Laboratório 1 - Informática</p>
      <span>
        ${scheduledDate} - ${keyTakenHourString} - ${keyReturnedHourString}
      </span>
    </div>

    <div class="key__list__item__btns-list">
      <button
        class="key__list__item__btn btn solid"
        title="Devolver chave em uso"
        onclick="deleteScheduledKey(${takenKey.id})"
      >
        <i class="ph-arrow-u-up-left ph-lg"></i>
      </button>
    </div>
  </li>`;

  updateNoItensListText(takenKeyListEl);
}

function deleteKeyItemOnTakenAccordion(keyId) {
  const takenKeyItemEl = document.getElementById(`taken-key-${keyId}`);

  if (takenKeyItemEl != undefined || takenKeyItemEl != null) {
    const takenKeyListEl = takenKeyItemEl.parentElement;

    takenKeyListEl.removeChild(takenKeyItemEl);
    updateNoItensListText(takenKeyListEl);
  }
}

/**
 * Essa função irá atualizar o texto que aparece quando não tem nenhuma chave agendada,
 * recebe como parâmetro um elemento de lista (ul) que dentro contenha o texto
 * que indica que não há chave agendada
 *
 * @param { Element } listElement
 */
function updateNoItensListText(listElement) {
  if (listElement.children.length > 1) {
    listElement.firstElementChild.classList.add("hidden");
  } else {
    listElement.firstElementChild.classList.remove("hidden");
  }
}

export {
  createNewKeyItemOnSchedulingAccordion,
  deleteKeyItemOnSchedulingAccordion,
  createKeyItemOnKeysInUseList,
  deleteKeyItemOnKeysInUseList,
  updateKeyItemStatusOnKeysInUseList,
  createNewKeyItemOnTakenAccordion,
  deleteKeyItemOnTakenAccordion,
  updateNoItensListText,
};
