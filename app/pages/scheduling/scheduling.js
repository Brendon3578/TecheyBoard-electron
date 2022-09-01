const Calendar = require('@toast-ui/calendar');

window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Carregou")
});

const dateStart = new Date();
const dateEnd = new Date(new Date().setMinutes(dateStart.getMinutes() + 120));

  const calendar = new Calendar('#calendar', {
    defaultView: 'day',
    isReadOnly: true,
    useDetailPopup: true,
    week: {
      eventView: ['time'],
      taskView: false,
      dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    },
    template: {
      weekDayName(model) {
        return (
          '<div class="calendar-event-weekday-name">' +
            '<div class="week-dayNumber">'+ model.date +'</div>' +
            '<div class="week-dayName">'+ model.dayName.slice(0, 3) +'</div>' +
          '</div>'
        )
      },
      time(event) {
        return `<div class="key-reserved">${event.title}<br>${event.body}</div>`
      },
    }
  });

  calendar.createEvents([
    {
      id: '1',
      calendarId: '1',
      title: 'Laboratório 1 - Roseli',
      category: 'time',
      dueDateClass: '',

      customStyle: {
        color: "#ffffff",
        backgroundColor: "var(--purple-500)",
        borderLeft: '0.25rem solid var(--purple-600)',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        fontWeight: 'bold',
      },
      body: 'Laboratório 1 reservado à Roseli - 2 Aulas 07:10 - 08:40',

      start: dateStart,
      end: dateEnd,
    },
  ]);

document.querySelector('#loading').classList.add('hidden');

  // variavel que armazena a data do calendário de hoje,
let today = calendar.getDate().valueOf();

// Formata a data do calendario em uma data composta:  30 de ago. de 2022
today = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric'} ).format(today)

document.querySelector('#todayDay').textContent = today

const updateDayInfo = () => {
  let calendarDate = calendar.getDate();

  calendarDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric'} ).format(calendarDate)

  document.querySelector('#todayDay').textContent = calendarDate;
}

const changeDateView = () => {
  let dateView = document.getElementById('dateViewSelect').value;
  console.log(dateView)

  if (dateView == 'day') calendar.changeView('day');
  if (dateView == 'week') calendar.changeView('week');
}

const prevDay = () => {
  calendar.prev();
  updateDayInfo();
}

const nextDay = () => {
  calendar.next();
  updateDayInfo();
}




// accordion script
let acc = document.getElementsByClassName("accordion--button");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("accordion-active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}