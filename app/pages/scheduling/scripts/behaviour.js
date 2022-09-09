const tippy = require("tippy.js").default;

import { formatDate } from "./utils.js";

/* Accordion Script */
// let acc = document.getElementsByClassName("action-accordion__trigger");
// let i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("accordion-active");
//     let panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }

// set username to header
const user = JSON.parse(sessionStorage.getItem("user"));
document.querySelectorAll(".username-text-DOM").forEach((el) => {
  el.textContent = user.user;
});

// set accordion date input today date
document.querySelectorAll('input[type="date"]').forEach((input) => {
  let today = formatDate(new Date(), "YYYY/MM/DD");

  input.value = today;

  // Atributo HTML do input date que faz com que tenha uma data minima para agendar
  // no caso, o usuário não conseguirá agendar para uma data anterior a data de hoje (data do sistemaa)
  input.setAttribute("min", today);
});

// menu user
const userMenuEl = document.getElementById("user-popover-menu-el");

tippy("#user-menu-trigger", {
  trigger: "click",
  content: userMenuEl.innerHTML,
  allowHTML: true,
  interactive: true,
});

// notification tooltip
const notificationEl = document.getElementById("notification-el");

tippy("#notification-tooltip-trigger", {
  content: notificationEl.innerHTML,
  allowHTML: true,
  delay: 500,
});

const logout = () => {
  sessionStorage.setItem("user", "");
  document.location.href = "../index/index.html";
};

window.logout = logout;
