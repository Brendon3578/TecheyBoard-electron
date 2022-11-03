const Calendar = require("@toast-ui/calendar");

import { CALENDAR_OPTIONS } from "./calendarOptions.js";
import {
  createKeyItemOnKeysInUseList,
  createNewKeyItemOnSchedulingAccordion,
  createNewKeyItemOnTakenAccordion,
  deleteKeyItemOnKeysInUseList,
  deleteKeyItemOnSchedulingAccordion,
  deleteKeyItemOnTakenAccordion,
  updateKeyItemStatusOnKeysInUseList,
} from "./key-data-constructor.js";
import {
  scheduledKeysList,
  postScheduledKeyListOnDatabase,
  labList,
} from "./database.js";
import { showErrorMessageOnConsole } from "../../../../scripts/error.js";
import { formatDate } from "../../../../scripts/utils.js";
import {
  createLabItemOnUseList,
  createLabOptionOnSelectInput,
} from "./lab-data-constructor.js";

/**
 * @typedef {import('../../../types/type').scheduledKey} scheduledKey
 * @typedef {import('../../../types/type').user} user
 * @typedef {import ('@toast-ui/calendar').default} Calendar
 */

// pegar as informações do usuário logado
/**
 * @type user+
 */
const userData = JSON.parse(sessionStorage.getItem("user"));
if (userData == null || userData == undefined) {
  showErrorMessageOnConsole(
    "Usuário não Existe!, Possíveis soluções do erro:\n• Re-logue no sistema"
  );
}

/**
 * @type { Calendar };
 */
const calendar = new Calendar("#calendar", CALENDAR_OPTIONS);

const today = {
  date: new Date(),
  completeDate: formatDate(new Date(), "YYYY-MM-DD"),
  time: formatDate(new Date(), "HH:MM"),
};

/**
 * Criar um novo agendamento dentro do widget de calendário
 *
 * @param {scheduledKey} scheduledKey O objeto de agendamento de chaves.
 */
function createNewSchedulingOnCalendar(scheduledKey) {
  const keyTakenHourString = formatDate(
    scheduledKey.scheduledTime.keyTakenHour,
    "HH:MM"
  );
  const keyReturnedHourString = formatDate(
    scheduledKey.scheduledTime.keyReturnedHour,
    "HH:MM"
  );

  const startHour = new Date(scheduledKey.scheduledTime.keyTakenHour);
  startHour.setMinutes(startHour.getMinutes() + 1);

  let classesAmountString =
    scheduledKey.scheduledTime.classesAmount.join("&ordf;, ") + "&ordf; aula";

  const classesAmountLength = scheduledKey.scheduledTime.classesAmount.length;

  if (classesAmountLength == 2) {
    classesAmountString += "s";
  } else if (classesAmountLength > 2) {
    const firstScheduledClass = scheduledKey.scheduledTime.classesAmount[0];
    const lastScheduledClass =
      scheduledKey.scheduledTime.classesAmount[classesAmountLength - 1];

    classesAmountString = `${firstScheduledClass}&ordf;...${lastScheduledClass}&ordf; aulas`;
  }

  const schedulingTitle = `
  <div class="scheduling-month">${scheduledKey.lab.name} ${scheduledKey.teacher.name} - ${keyTakenHourString} até ${keyReturnedHourString} </div>
  <div class="scheduling-title">
    <div class="description">
      <span>${scheduledKey.lab.name} - ${scheduledKey.teacher.name} - ${classesAmountString} </span>
    </div>
  </div>`;

  const schedulingBody = `
    <div class="scheduling-body">
      <p> ${scheduledKey.lab.name} </p>
      <p> Reservado à ${scheduledKey.teacher.name} </p>
      <p> ${scheduledKey.scheduledTime.classesAmount.length} Aulas - ${keyTakenHourString} - ${keyReturnedHourString} </p>
    </div>`;

  const schedulingColorList = ["purple", "blue", "orange"];

  let customStyleCssProps = {
    // mudar isso aqui mano
    color: "#fff",
    backgroundColor: `var(--${schedulingColorList[1]}-500)`,
    borderLeft: `0.25rem solid var(--${schedulingColorList[1]}-600)`,
    borderRadius: "0.5rem",
    padding: "0.5rem 0.25rem",
    fontWeight: "bold",
  };

  // se no calendário o horário agendado já tiver passado, o agendamento irá ficar cinza indicando
  // que aquele agendamento já passou

  if (scheduledKey.status == "") {
    customStyleCssProps.backgroundColor = "var(--neutral-500)";
    customStyleCssProps.borderLeft = "0.25rem solid var(--neutral-600)";
  }

  calendar.createEvents([
    {
      id: scheduledKey.id,
      calendarId: "1",
      title: schedulingTitle,
      category: "time",
      dueDateClass: "",
      customStyle: customStyleCssProps,
      body: schedulingBody,
      start: startHour,
      end: scheduledKey.scheduledTime.keyReturnedHour,
    },
  ]);
}

function deleteScheduledKey(keyId) {
  calendar.deleteEvent(keyId, "1");

  deleteKeyItemOnSchedulingAccordion(keyId);
  deleteKeyItemOnKeysInUseList(keyId);
  deleteKeyItemOnTakenAccordion(keyId);

  const index = scheduledKeysList.findIndex((object) => {
    return object.id === keyId;
  });

  scheduledKeysList.splice(index, 1);
  postScheduledKeyListOnDatabase();
}

function setScheduledKeyToTakenKey(keyId) {
  const index = scheduledKeysList.findIndex((object) => {
    return object.id === keyId;
  });

  scheduledKeysList[index].status = "";

  deleteKeyItemOnSchedulingAccordion(scheduledKeysList[index].id);
  createNewKeyItemOnTakenAccordion(scheduledKeysList[index]);
  updateKeyItemStatusOnKeysInUseList(keyId, "taken");

  postScheduledKeyListOnDatabase();
}

const updateDayInfo = () => {
  document.querySelector("#todayDay").textContent = formatDate(
    calendar.getDate(),
    "DD/MM/YYYY -long"
  );
};

const changeDateView = () =>
  calendar.changeView(document.getElementById("dateViewSelect").value);

const changeChangeOptions = {
  today: "today",
  tomorrow: "next",
  yesterday: "prev",
};

/**
 *  @param {'today' | 'tomorrow' | 'yesterday'} time
 */
function changeDay(time = "today") {
  const changeOption = changeChangeOptions[time];
  calendar[changeOption]();
  updateDayInfo();
}

// Função que carrega todos os agendamentos e as informações do app

function onInit() {
  // tirar a animação de loading do calendário quando inicia o app
  document.querySelector("#loading").classList.add("hidden");
  document.getElementById("calendar").classList.remove("hidden");

  setTimeout(() => {
    for (const lab of labList) {
      createLabItemOnUseList(lab);
      if (lab.status != "M") {
        createLabOptionOnSelectInput(lab);
      }
    }
    // quando rodar o script, construir os agendamentos dentro do widget de calendário
    for (const scheduledKey of scheduledKeysList) {
      console.log(scheduledKey);
      createNewSchedulingOnCalendar(scheduledKey);
      createKeyItemOnKeysInUseList(scheduledKey);

      const isUserCreatorOfScheduledKey =
        scheduledKey.teacher.name == userData.name;

      // Mostrar os agendamentos APENAS do usuário logado
      if (isUserCreatorOfScheduledKey) {
        switch (scheduledKey.status) {
          case "L":
            createNewKeyItemOnSchedulingAccordion(scheduledKey);
            break;
          case "U":
            createNewKeyItemOnTakenAccordion(scheduledKey);
            break;
          default:
            showErrorMessageOnConsole(
              "Status da chave não existe!, erro na aplicação"
            );
            break;
        }
      }
    }
  }, 1000);

  // Quando inicializar o script, irá setar o valor do dia dentro do widget do calendário
  updateDayInfo();
}

window.updateDayInfo = updateDayInfo;
window.changeDateView = changeDateView;
window.changeDay = changeDay;
window.deleteScheduledKey = deleteScheduledKey;
// window.setCalendarFilter = setCalendarFilter;
window.setScheduledKeyToTakenKey = setScheduledKeyToTakenKey;

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Carregou");

  // Função que carrega todos os agendamentos e as informações do app
  onInit();
});

export { createNewSchedulingOnCalendar, userData, today };
