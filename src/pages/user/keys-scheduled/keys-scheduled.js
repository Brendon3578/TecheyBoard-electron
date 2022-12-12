require("tw-elements");

/**
 * @typedef {import('../../types/type.js').scheduling} scheduling
 */

import { ControleChave } from "../../../database/models/controleChave.js";
import { userData } from "../../../scripts/behaviour.js";
import {
  createScheduleOnTableRow,
  createMessageAboutNoSchedulesFound,
} from "../../../scripts/dom-manipulation.js";
import { showToastMessage } from "../../../scripts/utils.js";

import { USER_PAGES_SIDEBAR_SECTIONS } from "./../user-page.config.js";
import { buildPageInformation } from "./../../config/buildPageInformation.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { iconSVGElements } from "./../../config/iconSVGElements.js";

buildSidebar(USER_PAGES_SIDEBAR_SECTIONS, "keys-scheduled");
buildPageInformation("Salas Agendadas", iconSVGElements.listIcon);

/**
 * @type scheduling[]
 */
let schedules = [];

const keysScheduledTbodyEl = document.getElementById("keys-scheduled-tbody");

ControleChave.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];

      // não salvar na variável schedules os agendamentos que não foram criadas pelo usuário logado
      // e não exibir os agendamentos que foram devolvidos
      if (data.funcId != userData.id || data.contChavControle == "RETURNED") {
      } else {
        schedules.push({
          id: data.contChavId,
          room: {
            id: data.salaId,
            name: data.salaDesc,
          },
          status: data.contChavControle,
          scheduledTime: {
            keyTakenHour: data.contChavDataPego,
            keyReturnedHour: data.contChavDataDevolver,
            classesAmount: data.contChavQntdAula.split("-"),
            period: data.contChavPeriodo,
          },
          teacher: {
            id: data.funcId,
            name: data.funcNome,
            registration: data.funcRegistration,
          },
        });
      }
    }
  })
  .then(() => {
    schedules.forEach((schedule) => {
      console.log(schedule);
      /**
       * TODO:
       *
       *  fazer pagination
       *  fazer opção de filtrar data
       *  fazer uma estilização do usuário clicar no tr da tabela e não e em um checkbox, que é muito pequeno
       *  fazer estilização para a tabela ser rolável (scrollable) no eixo y
       */

      createScheduleOnTableRow(keysScheduledTbodyEl, schedule);
    });
    console.log(schedules);
    if (schedules.length == 0) {
      createMessageAboutNoSchedulesFound(keysScheduledTbodyEl);
    }
  });

const bodyTitleEl = document.getElementById("modal-body-title");
const bodyTextEl = document.getElementById("modal-body-label");
const buttonActionLabelEl = document.getElementById("modal-btn-label");

function changeModalContent(bodyTitle, bodyText, buttonActionLabel) {
  bodyTitleEl.innerText = bodyTitle;
  bodyTextEl.innerText = `Tem certeza que você deseja ${bodyText}?`;
  buttonActionLabelEl.innerText = `Sim, ${buttonActionLabel}`;
}

/**
 * @param {string} buttonId o Id do botão que será alterado o atributo Disable
 * @param {boolean} boolean o valor booleano no qual irá habilitar ou desabilitar o botão
 */
function setDisabledAtributeOnButtonEl(buttonId, boolean) {
  let buttonEl = document.getElementById(buttonId);

  if (boolean) buttonEl.setAttribute("disabled", "");
  else buttonEl.removeAttribute("disabled");
}

let selectedScheduleId = 0;

function focusScheduleRow(e) {
  const radioInputValue = e.target.value;
  const scheduleId = radioInputValue.split("-")[0];
  const scheduleStatus = radioInputValue.split("-")[1];

  // Quando clicar no input de Radio, irá setar a variável global
  // do id do agendamento, para o id do agendamento selecionado
  selectedScheduleId = scheduleId;

  if (scheduleStatus == "USING") {
    setDisabledAtributeOnButtonEl("btn-remove", false);
    setDisabledAtributeOnButtonEl("btn-return", false);
    setDisabledAtributeOnButtonEl("btn-withdraw", true);
  } else if (scheduleStatus == "SCHEDULED") {
    setDisabledAtributeOnButtonEl("btn-remove", false);
    setDisabledAtributeOnButtonEl("btn-return", true);
    setDisabledAtributeOnButtonEl("btn-withdraw", false);
  }
}

const confirmModalButtonEl = document.getElementById("modal-btn-label");

/**
 * @param {'return' | 'withdraw' | 'remove'} actionType
 * O tipo da ação do agendamento que será disparada quando o botão for clicado
 */
function scheduledKeyAction(actionType) {
  let modalInformation = {
    title: "",
    text: "",
    actionLabel: "",
  };

  if (selectedScheduleId == undefined) return;

  if (actionType == "withdraw") {
    modalInformation.title = "Retirar a chave do Arduino";
    modalInformation.text = "retirar a chave do Arduino";
    modalInformation.actionLabel = "retirar a chave";
  } else if (actionType == "remove") {
    modalInformation.title = "Excluir o agendamento";
    modalInformation.text = "excluir o agendamento";
    modalInformation.actionLabel = "excluir";
  } else if (actionType == "return") {
    modalInformation.title = "Devolver chave";
    modalInformation.text = "devolver a chave da sala para o Arduino";
    modalInformation.actionLabel = "devolver";
  }

  changeModalContent(
    modalInformation.title,
    modalInformation.text,
    modalInformation.actionLabel
  );

  confirmModalButtonEl.setAttribute(
    "onclick",
    `confirmAction('${actionType}')`
  );
}

/**
 * @param {'return' | 'withdraw' | 'remove'} actionType
 * O tipo da ação do agendamento que será disparada quando o botão for clicado
 */
function confirmAction(actionType) {
  if (selectedScheduleId == undefined) return;

  let toastMessage = "";

  if (actionType == "withdraw") {
    toastMessage = "Retire a chave do Arduino!";
    ControleChave.updateOneColumn(
      selectedScheduleId,
      "contChavControle",
      "USING"
    );
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else if (actionType == "remove") {
    toastMessage = "Agendamento deletado com sucesso!";
    ControleChave.deleteFromId(selectedScheduleId);
    document.querySelector(`tr[id="${selectedScheduleId}"]`).innerHTML = "";
  } else if (actionType == "return") {
    toastMessage = "Coloque a chave de volta no Arduino!";
    ControleChave.updateOneColumn(
      selectedScheduleId,
      "contChavControle",
      "RETURNED"
    );
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
  showToastMessage(toastMessage);
}

window.scheduledKeyAction = scheduledKeyAction;
window.focusScheduleRow = focusScheduleRow;
window.confirmAction = confirmAction;
