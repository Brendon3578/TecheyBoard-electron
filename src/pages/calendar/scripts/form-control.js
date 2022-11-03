const Toastify = require("toastify-js");
import {
  scheduledKeysList,
  postScheduledKeyListOnDatabase,
} from "./database.js";

import {
  createNewSchedulingOnCalendar,
  userData,
  today,
} from "./scheduling.js";
import {
  createKeyItemOnKeysInUseList,
  createNewKeyItemOnSchedulingAccordion,
  createNewKeyItemOnTakenAccordion,
} from "./key-data-constructor.js";
import {
  getNextDayOfTheWeek,
  returnLastCharOfAString,
} from "../../../scripts/utils.js";

/**
 * @typedef {import ('./database').scheduledKey} scheduledKey
 */

const showFormErrorMessage = (errorEl, errorMessage) => {
  let errorMessageEl = document.querySelector(errorEl);

  errorMessageEl.classList.remove("hidden");
  errorMessageEl.innerText = errorMessage;

  setTimeout(() => {
    errorMessageEl.classList.add("hidden");
  }, 4000);
};

/**
 * Exibir mensagem Toast para o usuário
 *
 * @param {string} message A mensagem do toast que será exibida
 * @param {"success" | "error"} type O tipo de mensagem que será exibida.
 */
const showToastMessage = (message, type) => {
  const toastColors = {
    success: "green",
    error: "red",
  };

  Toastify({
    text: message,
    duration: 4000,
    style: {
      background: `linear-gradient(to right, var(--${toastColors[type]}-500), var(--${toastColors[type]}-600))`,
    },
  }).showToast();
};

// checkbox scheduleKeyForm behaviour
const weekdayInput = document.getElementById("weekday-input");
const dateInput = document.getElementById("date-input");

function scheduleForTheNext4Weeks() {
  weekdayInput.classList.toggle("hidden");
  dateInput.classList.toggle("hidden");
}

const classStartHourArray = [
  "07:10",
  "08:00",
  "08:50",
  "10:00",
  "10:50",
  "11:40",
];
const classEndHourArray = [
  "08:00",
  "08:50",
  "09:40",
  "10:50",
  "11:40",
  "12:30",
];

// schedule key form behavior
/**
 * @type HTMLFormElement
 */
const scheduleKeyForm = window.document.getElementById("schedule-key");

scheduleKeyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ScheduleFormInputsValue = {
    labId: parseInt(scheduleKeyForm.elements["lab"].value),
    labName: parseInt(scheduleKeyForm.elements["lab"].name),
    date: new Date(scheduleKeyForm.elements["date"].value),
    firstLesson: String(scheduleKeyForm.elements["first-lesson"].value),
    lastLesson: String(scheduleKeyForm.elements["last-lesson"].value),
    weekDay: parseInt(scheduleKeyForm.elements["weekday"].value),
    isScheduleForNext4Weeks: Boolean(
      scheduleKeyForm.elements["schedule-for-next-4-weeks"].checked
    ),
  };

  // verificar se o término da aula é maior do que a aula inicial:
  // não tem como uma aula começar depois que terminar:
  // aula inicial: 11:30 término da aula: 8:00
  let firstLessonNumber = parseInt(
    returnLastCharOfAString(ScheduleFormInputsValue.firstLesson)
  );
  let lastLessonNumber = parseInt(
    returnLastCharOfAString(ScheduleFormInputsValue.lastLesson)
  );

  if (firstLessonNumber - 1 >= lastLessonNumber) {
    showFormErrorMessage(
      "#error-message-01",
      "Insira um horário de aulas válida!"
    );
    return null;
  }

  let schedulingDate = ScheduleFormInputsValue.date;
  schedulingDate.setDate(schedulingDate.getDate() + 1);

  // lógica de pegar as aulas pegas: 4, 5 e 6 aula reservadas.
  let classesAmount = [];

  for (let i = firstLessonNumber; i <= lastLessonNumber; i++) {
    classesAmount.push(i);
  }

  let takenHourDate = new Date(
    schedulingDate.setHours(
      classStartHourArray[firstLessonNumber - 1].split(":")[0],
      classStartHourArray[firstLessonNumber - 1].split(":")[1]
    )
  );

  let returnedHourDate = new Date(
    schedulingDate.setHours(
      classEndHourArray[lastLessonNumber - 1].split(":")[0],
      classEndHourArray[lastLessonNumber - 1].split(":")[1]
    )
  );

  /**
   * @type {scheduledKey}
   */
  let schedulingData = {
    id: 0,
    lab: {
      id: ScheduleFormInputsValue.labId,
      name: ScheduleFormInputsValue.labName,
    },
    status: "AGENDADO",
    teacher: {
      id: userData.id,
      name: userData.name,
      rm: userData.RM,
    },
    scheduledTime: {
      keyTakenHour: takenHourDate,
      keyReturnedHour: returnedHourDate,
      classesAmount: classesAmount,
    },
  };

  if (ScheduleFormInputsValue.isScheduleForNext4Weeks) {
    const weekDayValue = ScheduleFormInputsValue.weekDay;

    // marcar já para o dia de hoje se o dia escolhido for o dia de hoje
    const isTodayChosenWeekDay = today.date.getDay() == weekDayValue;
    // aqui começa a gambiarra
    let daysToBeScheduled = [];

    if (isTodayChosenWeekDay) {
      daysToBeScheduled.push(today.date);
    }

    for (let i = 0; i <= 3; i++) {
      let futureDay = new Date(getNextDayOfTheWeek(today.date, weekDayValue));
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
      console.log(futureScheduledData);
      console.log(day);

      // scheduledKeysList.push(futureScheduledData);
      // createNewKeyItemOnSchedulingAccordion(futureScheduledData);
      // createKeyItemOnKeysInUseList(futureScheduledData);
      // createNewSchedulingOnCalendar(futureScheduledData);
      postScheduledKeyListOnDatabase(futureScheduledData);
    });
  } else {
    // scheduledKeysList.push(schedulingData);
    // createKeyItemOnKeysInUseList(schedulingData);
    // createNewKeyItemOnSchedulingAccordion(schedulingData);
    // createNewSchedulingOnCalendar(schedulingData);
    postScheduledKeyListOnDatabase(schedulingData);
  }

  showToastMessage("Agendamento cadastrado com sucesso!", "success");
});

// take now key form behavior
const takeNowKeyForm = document.getElementById("take-now-key");

takeNowKeyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const takeNowKeyFormInputsValue = {
    lab: parseInt(takeNowKeyForm.elements["lab"].value),
    firstLesson: String(takeNowKeyForm.elements["first-lesson"].value),
    lastLesson: String(takeNowKeyForm.elements["last-lesson"].value),
  };

  let firstLessonNumber = returnLastCharOfAString(
    takeNowKeyFormInputsValue.firstLesson
  );
  let lastLessonNumber = returnLastCharOfAString(
    takeNowKeyFormInputsValue.lastLesson
  );

  if (parseInt(firstLessonNumber) - 1 >= parseInt(lastLessonNumber)) {
    showFormErrorMessage(
      "#error-message-02",
      "Insira um horário de aulas válida!"
    );
  }

  // lógica de pegar as aulas pegas: 4, 5 e 6 aula reservadas.
  let classesAmount = [];

  for (let i = firstLessonNumber; i <= lastLessonNumber; i++) {
    classesAmount.push(i);
  }

  const todayDate = new Date();

  let takeNowKeyTakenDate = new Date(
    todayDate.setHours(
      classStartHourArray[firstLessonNumber - 1].split(":")[0],
      classStartHourArray[firstLessonNumber - 1].split(":")[1]
    )
  );

  let takeNowKeyReturnedDate = new Date(
    todayDate.setHours(
      classEndHourArray[lastLessonNumber - 1].split(":")[0],
      classEndHourArray[lastLessonNumber - 1].split(":")[1]
    )
  );

  /**
   * @type {scheduledKey}
   */
  let schedulingData = {
    id: Math.floor(Math.random() * 10000) + 1,
    labNumber: takeNowKeyFormInputsValue.lab,
    status: "USANDO",
    teacher: {
      id: userData.id,
      name: userData.name,
      rm: userData.RM,
    },
    scheduledTime: {
      keyTakenHour: takeNowKeyTakenDate,
      keyReturnedHour: takeNowKeyReturnedDate,
      classesAmount: classesAmount,
    },
  };

  scheduledKeysList.push(schedulingData);
  createKeyItemOnKeysInUseList(schedulingData);
  createNewKeyItemOnTakenAccordion(schedulingData);
  createNewSchedulingOnCalendar(schedulingData);

  postScheduledKeyListOnDatabase(schedulingData);
  showToastMessage("A chave será retirada agora!", "success");
});

window.scheduleForTheNext4Weeks = scheduleForTheNext4Weeks;
