const Toastify = require("toastify-js");
import { ChavesReservadas } from "./data-mock.js";

import { createNewLessonSchedulingOnCalendar } from "./scheduling.js";
import { formatDate } from "./utils.js";

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

const returnLastCharOfAString = (string) => {
  return string.substring(string.length - 1);
};

// checkbox scheduleKeyForm behaviour
const weekdayInput = document.getElementById("weekday-input");
const dateInput = document.getElementById("date-input");

function checkFixedDate() {
  weekdayInput.classList.toggle("hidden");
  dateInput.classList.toggle("hidden");
}

// schedule key form behavior
const scheduleKeyForm = window.document.getElementById("schedule-key");

scheduleKeyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(scheduleKeyForm.elements);

  // verificar se o término da aula é maior do que a aula inicial:
  // não tem como uma aula começar depois que terminar:
  // aula inicial: 11:30 término da aula: 8:00
  let firstLessonNumber = returnLastCharOfAString(
    scheduleKeyForm.elements["first-lesson"].value
  );
  let lastLessonNumber = returnLastCharOfAString(
    scheduleKeyForm.elements["last-lesson"].value
  );

  if (parseInt(firstLessonNumber) - 1 >= parseInt(lastLessonNumber)) {
    showFormErrorMessage(
      "#error-message-01",
      "Insira um horário de aulas válida!"
    );
    return null;
  }

  let classStartHourArray = [
    "07:10",
    "08:00",
    "08:50",
    "10:00",
    "10:50",
    "11:40",
  ];
  let classEndHourArray = [
    "08:00",
    "08:50",
    "09:40",
    "10:50",
    "11:40",
    "12:30",
  ];

  let schedulingDate = new Date(scheduleKeyForm.elements["date"].value);
  schedulingDate.setDate(schedulingDate.getDate() + 1);

  let schedulingInfo = {
    id: Math.floor(Math.random() * 1000) + 1,
    teacherName: "Antônio Cesar",
    labNumber: parseInt(scheduleKeyForm.elements["lab"].value),
    classesAmountLength: lastLessonNumber - firstLessonNumber + 1,
    keyTakenHour: new Date(
      schedulingDate.setHours(
        classStartHourArray[firstLessonNumber - 1].split(":")[0],
        classStartHourArray[firstLessonNumber - 1].split(":")[1],
        60
      )
    ),
    keyReturnedHour: new Date(
      schedulingDate.setHours(
        classEndHourArray[lastLessonNumber - 1].split(":")[0],
        classEndHourArray[lastLessonNumber - 1].split(":")[1]
      )
    ),
  };

  console.log(schedulingInfo);

  // lógica de pegar as aulas pegas: 4 e 5 aula reservadas.
  firstLessonNumber = parseInt(firstLessonNumber);
  lastLessonNumber = parseInt(lastLessonNumber);

  let classesAmount = [];

  for (let i = firstLessonNumber; i <= lastLessonNumber; i++) {
    classesAmount.push(i);
  }

  ChavesReservadas.push({
    id: schedulingInfo.id,
    labNumber: schedulingInfo.labNumber,
    teacher: {
      name: schedulingInfo.teacherName,
      RM: 0,
    },
    scheduledTime: {
      keyTakenHour: schedulingInfo.keyTakenHour,
      keyReturnedHour: schedulingInfo.keyReturnedHour,
      classesAmount,
    },
  });

  sessionStorage.setItem("scheduling-keys", JSON.stringify(ChavesReservadas));

  console.log(ChavesReservadas);

  showToastMessage("Agendamento cadastrado com sucesso!", "success");
  createNewLessonSchedulingOnCalendar(schedulingInfo);
});

// take now key form behavior
const takeKeyForm = document.getElementById("take-now-key");

takeKeyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstLessonNumber = returnLastCharOfAString(
    takeKeyForm.elements["first-lesson"].value
  );
  let lastLessonNumber = returnLastCharOfAString(
    takeKeyForm.elements["last-lesson"].value
  );

  if (parseInt(firstLessonNumber) - 1 >= parseInt(lastLessonNumber)) {
    showFormErrorMessage(
      "#error-message-02",
      "Insira um horário de aulas válida!"
    );
  }
});

window.checkFixedDate = checkFixedDate;
