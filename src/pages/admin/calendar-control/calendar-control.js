const Calendar = require("@toast-ui/calendar");
/**
 * @typedef {import ('@toast-ui/calendar').default} Calendar
 * @typedef {import('../../types/type').scheduling} scheduling
 */
import { CALENDAR_OPTIONS } from "../../user/calendar/calendarOptions.js";
import { formatDate } from "../../../scripts/utils.js";
import { SYSTEM_DATE } from "../../../scripts/behaviour.js";

import { ControleChave } from "../../../database/models/controleChave.js";

import { ADMIN_PAGES_SIDEBAR_SECTIONS } from "../admin-page.config.js";
import { buildPageInformation } from "../../config/buildPageInformation.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { iconSVGElements } from "../../config/iconSVGElements.js";

buildSidebar(ADMIN_PAGES_SIDEBAR_SECTIONS, "calendar-control");
buildPageInformation("Calendário de Controle", iconSVGElements.calendarIcon);

/**
 * @type { Calendar };
 */
const calendar = new Calendar("#calendar", CALENDAR_OPTIONS);

document.getElementsByName("date-view").forEach((el) => {
  el.addEventListener("click", () => {
    calendar.changeView(el.getAttribute("value"));
    updateCalendarDate();
  });
});

// atualizar a data do calendário
const calendarDateEl = document.getElementById("calendar-date");

const updateCalendarDate = () => {
  let calendarDate = calendar.getDate();
  let calendarView = calendar.getViewName();

  let calendarDateString = "";
  switch (calendarView) {
    case "day":
      calendarDateString = formatDate(calendarDate, "DD/MM/YYYY -long");
      break;
    case "week":
    case "month":
      calendarDateString = formatDate(calendarDate, "MM/YY --long");
      break;
  }

  calendarDateEl.textContent = calendarDateString;
};

document.getElementById("button-previous").addEventListener("click", () => {
  calendar.prev();
  updateCalendarDate();
});

document.getElementById("button-next").addEventListener("click", () => {
  calendar.next();
  updateCalendarDate();
});

updateCalendarDate();
document.getElementById("app-date").textContent = formatDate(
  SYSTEM_DATE.getToday(),
  "HH:MM"
);

/**
 * Criar um novo agendamento dentro do widget de calendário
 * @param {scheduling} schedule O objeto de agendamento de chaves.
 */
function createNewScheduleOnCalendar(schedule) {
  const startHour = new Date(schedule.scheduledTime.keyTakenHour);
  startHour.setMinutes(startHour.getMinutes() + 1);

  const keyTakenHourString = formatDate(
    schedule.scheduledTime.keyTakenHour,
    "HH:MM"
  );
  const keyReturnedHourString = formatDate(
    schedule.scheduledTime.keyReturnedHour,
    "HH:MM"
  );

  const reducedDateTimeString = formatDate(
    schedule.scheduledTime.keyTakenHour,
    "DD/MM"
  );

  const scheduledTimeString = `${reducedDateTimeString} das ${keyTakenHourString} até ${keyReturnedHourString}`;

  let classesAmountString =
    schedule.scheduledTime.classesAmount.join("&ordf;, ") + "&ordf; aula";

  const classesAmountLength = schedule.scheduledTime.classesAmount.length;

  if (classesAmountLength == 2) {
    classesAmountString += "s";
  } else if (classesAmountLength > 2) {
    const firstScheduledClass = schedule.scheduledTime.classesAmount[0];
    const lastScheduledClass =
      schedule.scheduledTime.classesAmount[classesAmountLength - 1];

    classesAmountString = `${firstScheduledClass}&ordf;...${lastScheduledClass}&ordf; aulas`;
  }

  /**
   * TODO:
   *
   * fazer estilização do tooltip
   * fazer estilização dos agendamentos que aparecem no calendário
   */

  const schedulingColorNameList = [
    "blue",
    "indigo",
    "violet",
    "purple",
    "rose",
  ];
  const schedulingColorList = [
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#f43f5e",
  ];

  const schedulingBorderColorList = [
    "#2563eb",
    "#4f46e5",
    "#7c3aed",
    "#9333ea",
    "#e11d48",
  ];

  let colorIndex = 0;

  // apenas uma customização básica
  if (schedule.room.id % 2 == 0) {
    colorIndex = 1;
  } else if (schedule.room.id % 3 == 0) {
    colorIndex = 2;
  } else if (schedule.room.id % 5 == 0) {
    colorIndex = 3;
  } else if (schedule.room.id % 7 == 0) {
    colorIndex = 4;
  }

  let selectedColor = schedulingColorNameList[colorIndex];

  const schedulingTitle = `
  <div class="event-popup__title">
    ${schedule.status == "RETURNED" ? "DEVOLVIDO" : ""}
    ${schedule.status == "USING" ? "USANDO AGORA" : ""}
    <span>${schedule.room.name} - </span> <span>${schedule.teacher.name}</span>
  </div>`;

  const schedulingBody = `
    <ul class="event-popup__info-list">
      <li class="event-popup__info-item event-popup__item__icon--highlight highlight--${selectedColor}" title="Sala reservada: ${schedule.room.name}">
        <div class="event-popup__item__icon">${iconSVGElements.cubeMiniIcon}</div>
        ${schedule.room.name}
      </li>
      <li class="event-popup__info-item" title="Horário do agendamento: ${scheduledTimeString}">
      <div class="event-popup__item__icon">${iconSVGElements.clockMiniIcon}</div>
        ${scheduledTimeString}
      </li>
      <li class="event-popup__info-item" title="Aulas reservadas: ${classesAmountString}">
        <div class="event-popup__item__icon">${iconSVGElements.questionCircleMiniIcon}</div>
        Aulas reservadas: ${classesAmountString}
      </li>
      <li class="event-popup__info-item " title="Reservado a sala por: ${schedule.teacher.name}">
        <div class="event-popup__item__icon">${iconSVGElements.userMiniIcon}</div>
        ${schedule.teacher.name}
      </li>
    </ul>`;

  let customStyleCssProps = {
    color: "#fff",
    backgroundColor: schedulingColorList[colorIndex],
    borderLeft: `0.25rem solid ${schedulingBorderColorList[colorIndex]}`,
    borderRadius: "0.25rem",
    padding: "0.25rem 0.125rem",
    fontWeight: "500",
    fontFamily: "Inter, sans-serif",
    opacity: 1,
  };

  // se no calendário o horário agendado já tiver passado ou a chave já foi devolvida,
  // o agendamento irá ficar cinza indicando que aquele agendamento já passou/devolvido
  if (
    schedule.status == "DEVOLVIDO" ||
    schedule.scheduledTime.keyReturnedHour.getTime() <
      SYSTEM_DATE.getToday().getTime()
  ) {
    customStyleCssProps.opacity = 0.7;
  }

  calendar.createEvents([
    {
      id: schedule.id,
      calendarId: "1",
      title: schedulingTitle,
      category: "time",
      dueDateClass: "",
      customStyle: customStyleCssProps,
      body: schedulingBody,
      start: startHour,
      end: schedule.scheduledTime.keyReturnedHour,
    },
  ]);
}

/**
 * @type scheduling[]
 */
let schedules = [];

ControleChave.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];

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
  })
  .then(() => {
    schedules.forEach((schedule) => {
      createNewScheduleOnCalendar(schedule);
    });
  });
