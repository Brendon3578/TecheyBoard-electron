import { iconSVGElements } from "./iconSVGElements.js";
import { userData } from "../../scripts/behaviour.js";

/**
 * @typedef {import('../types/type.js').sidebarSectionType } sidebarSectionType
 * @typedef {import('../types/type.js').sidebarPageType} sidebarPageType
 */

let currentPageHrefValue = "";

const sidebarEl = document.getElementById("sidebar");

/**
 * @param {sidebarSectionType[]} sidebarLinksSections
 * @param {string} currentPageHrefName
 */
function buildSidebar(sidebarLinksSections, currentPageHrefName) {
  currentPageHrefValue = currentPageHrefName;

  let sidebarChildren = [
    constructSidebarLogo(),
    constructSidebarNavigation(sidebarLinksSections),
    constructSidebarUserWrapper(),
    constructSidebarToggleButton(),
  ].join("");

  sidebarEl.innerHTML += sidebarChildren;

  createSidebarBehavior();
}

function constructSidebarLogo() {
  return `
  <div class="sidebar__brand">
    <img
      src="../../../assets/logo-icon.png"
      alt="Arduteam"
      class="logo__img"
    />
    <span class="logo__title"><span>Ardu</span>team</span>
  </div>
  `;
}

/**
 * @param {sidebarSectionType[]} pageSections
 */
function constructSidebarNavigation(pageSections) {
  return `
    <nav class="sidebar__navigation">
      ${pageSections.map(constructLinkSection).join("")}
    </nav>
  `;
}
/**
 * @param {sidebarSectionType} section
 */
function constructLinkSection(section) {
  return `
  <div class="sidebar__section">
  <h4 class="sidebar__label">${section.label}</h4>
  ${section.pages.map(constructLink).join("")}
  </div>
  <div class="sidebar__separator"></div>
  `;
}

/**
 * @param {sidebarPageType} page
 */
function constructLink(page) {
  let isCurrentPage = page.hrefName == currentPageHrefValue;
  let pageHref = `../${page.hrefName}/${page.hrefName}.html`;
  let linkClassNames = `navigation__link`;

  if (isCurrentPage) linkClassNames += " navigation__link--highlight";

  return `
    <a
      href="${isCurrentPage ? "#" : pageHref}"
      class="${linkClassNames}"
      title="${page.titleAttribute}"
      ${page.idAttribute == undefined ? "" : `id="${page.idAttribute}"`}
    >
      ${page.iconEl}
      <span> ${page.label} </span>
    </a>
  `;
}

function constructSidebarUserWrapper() {
  const userName = userData.name;
  const userNameFirstLettersArrays = userName.split(" ");

  let userNameFirstLetters =
    userNameFirstLettersArrays.length > 1
      ? userNameFirstLettersArrays[0].charAt(0) +
        userNameFirstLettersArrays[1].charAt(0)
      : userName.slice(0, 2);

  return `
    <div class="sidebar__user-wrapper">
      <div class="user__avatar">
        <p class="user__avatar__letters">
          ${
            userData.registration != "admin"
              ? userNameFirstLetters.toUpperCase()
              : `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          `
          }
        </p>
      </div>
      <p class="user__name">${userName}</p>
    </div>
  `;
}

function constructSidebarToggleButton() {
  return `
    <button
      class="sidebar__toggle-button"
      title="Fechar Sidebar"
      aria-expanded="true"
      id="sidebar-toggle-button"
      onclick="handleClickToToggleSidebar(event)"
    >
      ${iconSVGElements.sidebarArrowIcon}
    </button>
  `;
}

function createSidebarBehavior() {
  const exitLink = document.getElementById("sidebar-exit-btn");

  exitLink.setAttribute("onclick", "exitAccount()");

  exitLink.setAttribute("href", "#");
}

export { buildSidebar };
