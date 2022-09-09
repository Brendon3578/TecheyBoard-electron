const Calendar = require("@toast-ui/calendar");

import { ChavesReservadas } from "./data-mock.js";
import { formatDate } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Carregou");
});

const dayNames = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const calendar = new Calendar("#calendar", {
  defaultView: "day",
  isReadOnly: true,
  useDetailPopup: false,
  useCreationPopup: false,
  week: {
    eventView: ["time"],
    taskView: false,
    dayNames: dayNames,
  },
  template: {
    weekDayName(model) {
      return (
        '<div class="calendar-event-weekday-name">' +
        '<div class="week-dayNumber">' +
        model.date +
        "</div>" +
        '<div class="week-dayName">' +
        model.dayName.slice(0, 3) +
        "</div>" +
        "</div>"
      );
    },
    time(event) {
      return `<div class="key-reserved">${event.title}<br>${event.body}</div>`;
    },
  },
});

const createNewLessonSchedulingOnCalendar = ({
  id,
  teacherName,
  labNumber,
  classesAmountLength,
  keyTakenHour,
  keyReturnedHour,
}) => {
  const schedulingTitle = `Laboratório ${labNumber} - ${teacherName}`;

  const keyTakenHourString = formatDate(keyTakenHour, "HH:MM");

  const keyReturnedHourString = formatDate(keyReturnedHour, "HH:MM");

  const schedulingBody =
    `Laboratório ${labNumber} reservado à ${teacherName} ` +
    `${classesAmountLength} Aulas - ${keyTakenHourString} - ${keyReturnedHourString} `;

  const schedulingColor = ["blue", "orange", "purple"];

  calendar.createEvents([
    {
      id: id,
      calendarId: "1",
      title: schedulingTitle,
      category: "time",
      dueDateClass: "",
      customStyle: {
        color: "#fff",
        backgroundColor: `var(--${schedulingColor[labNumber - 1]}-500)`,
        borderLeft: `0.25rem solid var(--${
          schedulingColor[labNumber - 1]
        }-600)`,
        borderRadius: "0.5rem",
        padding: "0.5rem",
        fontWeight: "bold",
      },
      body: schedulingBody,
      start: keyTakenHour,
      end: keyReturnedHour,
    },
  ]);
};

for (const chave of ChavesReservadas) {
  const keyInfo = {
    id: chave.id,
    teacherName: chave.teacher.name,
    labNumber: chave.labNumber,
    classesAmountLength: chave.scheduledTime.classesAmount.length,
    keyTakenHour: new Date(chave.scheduledTime.keyTakenHour),
    keyReturnedHour: new Date(chave.scheduledTime.keyReturnedHour),
  };

  createNewLessonSchedulingOnCalendar(keyInfo);
}

document.querySelector("#loading").classList.add("hidden");

// Quando rodar esse script, irá setar o valor do dia dentro do widget do calendário
document.querySelector("#todayDay").textContent = formatDate(
  calendar.getDate().valueOf(),
  "DD/MM/YYYY -long"
);

const updateDayInfo = () => {
  document.querySelector("#todayDay").textContent = formatDate(
    calendar.getDate(),
    "DD/MM/YYYY -long"
  );
};

const changeDateView = () => {
  let dateView = document.getElementById("dateViewSelect").value;

  if (dateView == "day") calendar.changeView("day");
  if (dateView == "week") calendar.changeView("week");
};

const prevDay = () => {
  calendar.prev();
  updateDayInfo();
};

const nextDay = () => {
  calendar.next();
  updateDayInfo();
};

const moveCalendarDateToToday = () => {
  calendar.today();
  updateDayInfo();
};

window.updateDayInfo = updateDayInfo;
window.changeDateView = changeDateView;
window.nextDay = nextDay;
window.prevDay = prevDay;
window.moveCalendarDateToToday = moveCalendarDateToToday;

export { createNewLessonSchedulingOnCalendar };
