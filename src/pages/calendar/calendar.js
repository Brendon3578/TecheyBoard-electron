const Calendar = require("@toast-ui/calendar");

import { CALENDAR_OPTIONS } from "./scripts/calendarOptions.js";
import { formatDate } from "../../scripts/utils.js";

/**
 * @typedef {import ('@toast-ui/calendar').default} Calendar
 */

/**
 * @type { Calendar };
 */
const calendar = new Calendar("#calendar", CALENDAR_OPTIONS);

const applicationDate = new Date();

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
  applicationDate,
  "HH:MM"
);
