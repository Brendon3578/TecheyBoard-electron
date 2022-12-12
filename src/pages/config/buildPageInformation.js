const pageTitleEl = document.querySelector("title");

function buildHeadTitle(pageTitle) {
  pageTitleEl.textContent = `${pageTitle} - Techeyboard`;
}

function buildMainHeader(pageTitle, pageIcon) {
  document.getElementById("content-header").innerHTML += `
  <div class="content__header__title">
    <span class="header__title__icon">
      ${pageIcon}
    </span>
    <h2>${pageTitle}</h2>
  </div>
  `;
}

export function buildPageInformation(pageTitle, pageIcon) {
  buildHeadTitle(pageTitle);
  buildMainHeader(pageTitle, pageIcon);
}
