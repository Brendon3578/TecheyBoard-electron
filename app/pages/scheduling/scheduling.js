const Calendar = require('@toast-ui/calendar');

const dateStart = new Date()
const dateEnd = new Date(new Date().setMinutes(dateStart.getMinutes() + 120))

console.log(dateEnd)

window.addEventListener('DOMContentLoaded', () => {
  const calendar = new Calendar('#calendar', {
    defaultView: 'week',
    isReadOnly: true,
    useDetailPopup: true,
    week: {
      eventView: ['time'],
      taskView: false,
    },
  });

  calendar.createEvents([
    {
      id: '1',
      calendarId: '1',
      title: 'RESERVADO Laboratorio 1',
      category: 'time',
      dueDateClass: '',

      color: "#ffffff",
      backgroundColor: "#a855f7",
      start: dateStart,
      end: dateEnd,
    },
  ]);

  document.querySelector('#loading').classList.add('hidden');
});