const tippy = require('tippy.js').default

const formatDate = (date) => {
  day  = date.getDate().toString().padStart(2, '0'),
  month  = (date.getMonth()+1).toString().padStart(2, '0'),
  year  = date.getFullYear();

  return `${year}-${month}-${day}`;
}

/* Accordion Script */
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


// set accordion date input today date
document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.value = formatDate(new Date());
});

// menu user
const userMenuEl = document.getElementById('user-popover-menu-el');

tippy('#user-menu-trigger', {
  trigger: 'click',
  content: userMenuEl.innerHTML,
  allowHTML: true,
  interactive: true,
});

// notification tooltip
const notificationEl = document.getElementById('notification-el');

tippy('#notification-tooltip-trigger', {
  content: notificationEl.innerHTML,
  allowHTML: true,
  delay: 500,
});