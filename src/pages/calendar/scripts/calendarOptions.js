/**
 * @typedef {import('@toast-ui/calendar/types/types/options').Options} Options
 *
 * @typedef {{
 *   id: number,
 *   labNumber: number,
 *   teacher: {
 *     name: string,
 *     registration: string,
 *   },
 *   scheduledTime: {
 *     keyTakenHour: Date,
 *     keyReturnedHour: Date,
 *     classesAmount: number[],
 *   },
 * }} scheduledKey
 */

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const completeDayNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

/**
 * @type Options
 */
export const CALENDAR_OPTIONS = {
  defaultView: "day",
  isReadOnly: true,
  useDetailPopup: false,
  useCreationPopup: false,
  week: {
    eventView: ["time"],
    taskView: false,
    dayNames: dayNames,
    workweek: true,
  },
  month: {
    dayNames: dayNames,
  },
  // template: {
    // time(event) {
    //   return `<div class="key-calendar">${event.title}<br>${event.body}</div>`;
    // },
    // monthGridHeader(model) {
    //   const date = parseInt(model.date.split("-")[2], 10);
    //   return `<span id=${
    //     model.isToday ? "month-date-today" : ""
    //   }>${date}</span>`;
    // },
    // monthGridHeaderExceed(hiddenEvents) {
    //   return `<span>${hiddenEvents} reserv.</span>`;
    // },
    // monthMoreTitleDate(moreTitle) {
    //   const { date, day } = moreTitle;

    //   return `<span>${date} - ${completeDayNames[day]}</span>`;
    // },
    // monthDayName(model) {
    //   return `<span class="calendar-month-day-name">${model.label}</span>`;
    // },
    // monthMoreClose() {
    //   return "<button class='btn-close-more-modal'>Fechar</button>";
    // },
  // },s
};
