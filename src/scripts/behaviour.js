/**
 * @typedef {import('../pages/types/type.js').user} user
 */
import { showToastMessage } from "./utils.js";

/**
 * @type user
 */
const userData = JSON.parse(sessionStorage.getItem("user"));

const saveUserData = (data = userData) => {
  sessionStorage.setItem("user", JSON.stringify(data));
};

if (userData == null || userData == undefined) {
  showToastMessage(
    "Usuário não Existe!, Possíveis formas de solucionar o erro:\n• Re-logue no sistema \n• Reinicie o sistema"
  );
}

const sidebarPageEl = document.getElementById("sidebar");

let isSidebarHided = false;
const userPrefersSidebarShouldHide = sessionStorage.getItem(
  "should-hide-sidebar"
);

/**
 * @param {HTMLElement} element
 */
function toggleSidebarButtonAttributes(element) {
  element.setAttribute("aria-expanded", isSidebarHided);

  // o operador "+" é utilizado para converter o valor booleano em um número (0 ou 1)
  element.setAttribute(
    "title",
    ["Fechar", "Abrir"][+isSidebarHided] + " Sidebar"
  );
}

function handleClickToToggleSidebar(event) {
  toggleSidebarHiddenStyle();
  toggleSidebarButtonAttributes(event.target);

  isSidebarHided = !isSidebarHided;
  sessionStorage.setItem("should-hide-sidebar", isSidebarHided);
}

const toggleSidebarHiddenStyle = () => {
  sidebarPageEl.classList.toggle("app__sidebar--hidded");
};

function exitAccount() {
  saveUserData(null);
  setTimeout(() => {
    document.location.href = "../../index/index.html";
  }, 250);
}

// abstração para ser a data do sistema
const SYSTEM_DATE = {
  getToday: () => new Date(),
  getPreviousDay: (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    previous.setHours(0, 0, 0);

    return previous;
  },
};

window.addEventListener("DOMContentLoaded", () => {
  if (userPrefersSidebarShouldHide == "true") {
    isSidebarHided = userPrefersSidebarShouldHide == "true" ? true : false;
    toggleSidebarHiddenStyle();

    toggleSidebarButtonAttributes(
      document.getElementById("sidebar-toggle-button")
    );
  }
});

window.exitAccount = exitAccount;
window.handleClickToToggleSidebar = handleClickToToggleSidebar;

export { userData, saveUserData, SYSTEM_DATE };
