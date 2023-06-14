/**
 * @typedef {import('../../types/type.js').room } room
 * @typedef {import('../../types/type.js').scheduling} scheduling
 * @typedef {import('../../types/type.js').periodType} periodType
 */

import { database } from "../../../database/db.js";

import {
  formatDate,
  isDateValid,
  showToastMessage,
  getLastCharOfAString,
  getNextDayOfTheWeek,
} from "../../../scripts/utils.js";

import { SYSTEM_DATE, userData } from "../../../scripts/behaviour.js";

import { Sala } from "../../../database/models/sala.js";

import { ControleChave } from "../../../database/models/controleChave.js";
import { USER_PAGES_SIDEBAR_SECTIONS } from "./../user-page.config.js";
import { buildPageInformation } from "./../../config/buildPageInformation.js";
import { iconSVGElements } from "./../../config/iconSVGElements.js";
import { buildSidebar } from "./../../config/buildSidebar.js";

buildSidebar(USER_PAGES_SIDEBAR_SECTIONS, "schedule-key");
buildPageInformation("Agendar chave", iconSVGElements.clockIcon);

database.connect().catch((reason) => {
  showToastMessage("Banco de Dados não conectado!", 8000, "alert");
});

database.createAllTables();

/**
 * @type room[]
 */
let rooms = [];

Sala.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const salaData = results[i];
      rooms.push({
        id: salaData.salaId,
        roomName: salaData.salaDesc,
        status: salaData.salaSituacao,
      });
    }
  })
  .then(() => {
    // add rooms options in select input
    const roomSelectEl = document.getElementById("form-select-room");

    rooms.forEach((room) => {
      if (room.status != "MAINTENANCE")
        roomSelectEl.innerHTML += `<option value="${room.id}">${room.roomName}</option>`;
    });
  });

/**
 *
 * @param {scheduling} scheduling
 */
function insertNewControleChaveOnDatabase(scheduling) {
  const dataPegoDateTime = formatDate(
    scheduling.scheduledTime.keyTakenHour,
    "YYYY-MM-DD HH:MM:SS"
  );

  const dataDevolverDateTime = formatDate(
    scheduling.scheduledTime.keyReturnedHour,
    "YYYY-MM-DD HH:MM:SS"
  );

  const controleVarChar = scheduling.status;

  const qntdAulaVarChar = scheduling.scheduledTime.classesAmount.join("-");

  const periodoVarChar = scheduling.scheduledTime.period;

  const funcIdInt = scheduling.teacher.id;

  const salaIdInt = scheduling.room.id;

  ControleChave.insert(
    dataPegoDateTime,
    dataDevolverDateTime,
    controleVarChar,
    qntdAulaVarChar,
    periodoVarChar,
    funcIdInt,
    salaIdInt
  );
}

const CLASS_HOUR = {
  MORNING: {
    START: ["07:10", "08:00", "08:50", "10:00", "10:50", "11:40"],
    END: ["08:00", "08:50", "09:40", "10:50", "11:40", "12:30"],
  },
  AFTERNOON: {
    START: ["13:10", "14:00", "14:50", "16:00", "16:50", "17:40"],
    END: ["14:00", "14:50", "15:40", "16:50", "17:40", "18:30"],
  },
  NIGHT: {
    START: ["19:00", "21:00"],
    END: ["20:40", "22:40"],
  },
};

/**
 *
 * @param {HTMLInputElement} selectInputEl
 * @param {'first' | 'last'} lessonTime
 * @param {periodType} period
 */
function updateLessonSelectOptions(selectInputEl, lessonTime, period) {
  if (lessonTime == "first") {
    selectInputEl.innerHTML = `<option value="">Aula inicial</option>`;

    CLASS_HOUR[period].START.forEach((classHour, i) => {
      selectInputEl.innerHTML += `<option value="first-lesson-${i + 1}" ${
        i == 0 ? "selected" : ""
      }>
        das ${classHour} - ${i + 1}ª Aula
        </option>`;
    });
  } else if (lessonTime == "last") {
    selectInputEl.innerHTML = `<option value="">Término da aula</option>`;

    CLASS_HOUR[period].END.forEach((classHour, i) => {
      selectInputEl.innerHTML += `<option value="first-lesson-${i + 1}" ${
        i == 0 ? "selected" : ""
      }>
        até ${classHour}
      </option>`;
    });
  }
}

let selectedPeriod = "MORNING";

const firstLessonSelectEl = document.getElementById("first-lesson-select");
const lastLessonSelectEl = document.getElementById("last-lesson-select");

updateLessonSelectOptions(firstLessonSelectEl, "first", selectedPeriod);
updateLessonSelectOptions(lastLessonSelectEl, "last", selectedPeriod);

// mudar os valores dos horários quando os radio inputs forem trocados
document.getElementsByName("period").forEach((radioInputEl) => {
  radioInputEl.addEventListener("change", function () {
    /**
     * @type {string}
     */
    let periodRadioInputValue = this.value.toString().toUpperCase();

    selectedPeriod = periodRadioInputValue;

    updateLessonSelectOptions(firstLessonSelectEl, "first", selectedPeriod);
    updateLessonSelectOptions(lastLessonSelectEl, "last", selectedPeriod);
  });
});

// setar um valor inicial para o input de data

const showableWeekdayInputEl = document.getElementById(
  "showable-weekday-input"
);
const showableDateInput = document.getElementById("showable-date-input");

const showWeekdayInput = () => {
  showableWeekdayInputEl.classList.remove("hidden");
  showableDateInput.classList.add("hidden");
};
const showDateInput = () => {
  showableWeekdayInputEl.classList.add("hidden");
  showableDateInput.classList.remove("hidden");
};

document
  .getElementById("next-4-weeks-checkbox")
  .addEventListener("change", function () {
    if (this.checked) showWeekdayInput();
    else showDateInput();

    // setar o valor do input de date para o dia de hoje, para evitar bugs na hora do submit
  });

/**
 * TODO: fazer verificação das data do agendamento, para o professor não poder criar um agendamento
 * em cima de outro agendamento
 */

const scheduleKeyFormEl = document.getElementById("schedule-key");
let shouldUpdateDatabase = true;

scheduleKeyFormEl.addEventListener("submit", (el) => {
  el.preventDefault();

  if (shouldUpdateDatabase == false) return;

  const formData = {
    roomId: parseInt(scheduleKeyFormEl.elements["room"].value),
    date: new Date(
      /*pura gambiarra:
        inverter a data do input de texto referente à data:
        exemplo: 07/11/2022 vira 11/07/2022, é necessário para se...
        ...criar a data dentro do javascript */
      scheduleKeyFormEl.elements["date"].value.split("/").reverse().join("/")
    ),
    firstLesson: String(scheduleKeyFormEl.elements["first-lesson"].value),
    lastLesson: String(scheduleKeyFormEl.elements["last-lesson"].value),
    weekDay: parseInt(scheduleKeyFormEl.elements["weekday"].value),
    isScheduleForNext4Weeks: Boolean(
      scheduleKeyFormEl.elements["schedule-for-next-4-weeks"].checked
    ),
  };

  // VERIFICAR se é uma data inválida (se é do formato DATE do javascript)
  //  e apenas se o checkbox de marcar para as próximas 4 semanas não estiver marcado,
  //  para evitar bugs no submit
  if (
    !isDateValid(formData.date) &&
    formData.isScheduleForNext4Weeks == false
  ) {
    // será executado esse bloco APENAS se for uma data inválida
    showToastMessage("Insira uma data válida!");
    return;
  }

  // VERIFICAR se a data inserida não é um dia anterior ao do dia atual do sistema
  // exemplo: se hoje é dia 09/11, não é permitido marcar para o dia 08/11
  if (
    formData.date.getTime() < SYSTEM_DATE.getPreviousDay().getTime() &&
    formData.isScheduleForNext4Weeks == false
  ) {
    showToastMessage("Insira que seja data que seja do dia atual para frente!");
    return;
  }

  // VERIFICAR se há uma opção de dia da semana selecionado quando o checkbox
  //  de marcar para as próximas 4 semanas estiver macado
  if (formData.weekDay == -1 && formData.isScheduleForNext4Weeks) {
    showToastMessage("Insira um dia da semana!");
    return;
  }

  let firstLessonNumber = parseInt(getLastCharOfAString(formData.firstLesson));
  let lastLessonNumber = parseInt(getLastCharOfAString(formData.lastLesson));

  // VERIFICAR se o término da aula é maior do que a aula inicial:
  // não tem como uma aula começar depois que terminar:
  // aula inicial: 11:30 término da aula: 8:00
  if (firstLessonNumber - 1 >= lastLessonNumber) {
    showToastMessage("Insira um horário de aulas válido!");
    return;
  }

  let schedulingDate = formData.date;

  // sem esse trecho de código irá dar erro quando escolher o dia da semana dos 4
  // ...agendamentos próximos pois para o cálculo do próximo dia da semana é
  // ...necessário ter um dia já escolhido
  if (
    isDateValid(schedulingDate) == false ||
    formData.isScheduleForNext4Weeks
  ) {
    schedulingDate = new Date();
  }
  // lógica de pegar as aulas pegas, exemplo: 4, 5 e 6 aula reservadas.
  let classesAmount = [];

  for (let i = firstLessonNumber; i <= lastLessonNumber; i++) {
    classesAmount.push(i);
  }

  let takenHourDate = new Date(
    schedulingDate.setHours(
      CLASS_HOUR[selectedPeriod].START[firstLessonNumber - 1].split(":")[0],
      CLASS_HOUR[selectedPeriod].START[firstLessonNumber - 1].split(":")[1]
    )
  );

  let returnedHourDate = new Date(
    schedulingDate.setHours(
      CLASS_HOUR[selectedPeriod].END[lastLessonNumber - 1].split(":")[0],
      CLASS_HOUR[selectedPeriod].END[lastLessonNumber - 1].split(":")[1]
    )
  );

  /**
   * @type {scheduling}
   */
  let schedulingData = {
    id: 0,
    room: {
      id: formData.roomId,
    },
    status: "SCHEDULED",
    teacher: {
      id: userData.id,
      name: userData.name,
      registration: userData.registration,
    },
    scheduledTime: {
      keyTakenHour: takenHourDate,
      keyReturnedHour: returnedHourDate,
      classesAmount: classesAmount,
      // TO DO: fazer um select para os períodos das aulas
      period: selectedPeriod,
    },
  };

  if (formData.isScheduleForNext4Weeks) {
    const weekDayValue = formData.weekDay;

    // marcar já para o dia de hoje se o dia escolhido for o dia de hoje
    const isTodayChosenWeekDay =
      SYSTEM_DATE.getToday().getDay() == weekDayValue;
    // aqui começa a gambiarra
    let daysToBeScheduled = [];

    if (isTodayChosenWeekDay) {
      daysToBeScheduled.push(new Date());
    }

    for (let i = 0; i <= 3; i++) {
      let futureDay = new Date(
        getNextDayOfTheWeek(SYSTEM_DATE.getToday(), weekDayValue)
      );
      futureDay.setDate(futureDay.getDate() + i * 7);

      daysToBeScheduled.push(futureDay);
    }

    daysToBeScheduled.forEach((day) => {
      // GAMBIARRA DOIDA PRA SALVAR A DATA, E NÃO SALVAR A ÚLTIMA DATA DO LAÇO DE INTERAÇÃO
      let futureScheduledData = JSON.stringify(schedulingData);
      futureScheduledData = JSON.parse(futureScheduledData);
      futureScheduledData.id = Math.floor(Math.random() * 10000) + 1;

      futureScheduledData.scheduledTime.keyReturnedHour = new Date(
        day.setHours(returnedHourDate.getHours(), returnedHourDate.getMinutes())
      );
      futureScheduledData.scheduledTime.keyTakenHour = new Date(
        day.setHours(takenHourDate.getHours(), takenHourDate.getMinutes())
      );

      let futureScheduleDateTime = formatDate(
        futureScheduledData.scheduledTime.keyTakenHour,
        "DD/MM"
      );
      showToastMessage(
        `Agendamento do dia: ${futureScheduleDateTime} cadastrado com sucesso!`
      );

      insertNewControleChaveOnDatabase(futureScheduledData);
    });
  } else {
    console.log(schedulingData);
    insertNewControleChaveOnDatabase(schedulingData);
    showToastMessage("Agendamento cadastrado com sucesso!");
  }

  shouldUpdateDatabase = false;
  setTimeout(() => {
    location.reload();
  }, 3000);
});
