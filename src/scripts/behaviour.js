const toggleSidebarButtonEl = document.getElementById("toggle-sidebar-btn");
const sidebarPageEl = document.getElementById("sidebar");

let isSidebarHided = false;
const userPrefersSidebarShouldHide = sessionStorage.getItem(
  "should-hide-sidebar"
);
if (userPrefersSidebarShouldHide == "true") {
  isSidebarHided = userPrefersSidebarShouldHide;
  toggleSidebar();
}

function toggleSidebar() {
  sidebarPageEl.classList.toggle("app__sidebar--hidded");

  toggleSidebarButtonEl.setAttribute("aria-expanded", isSidebarHided);

  // o operador "+" é utilizado para converter o valor booleano em um número (0 ou 1)
  toggleSidebarButtonEl.setAttribute(
    "title",
    ["Fechar", "Abrir"][+isSidebarHided] + " Sidebar"
  );
}

toggleSidebarButtonEl.addEventListener("click", () => {
  isSidebarHided = !isSidebarHided;
  toggleSidebar();
  sessionStorage.setItem("should-hide-sidebar", isSidebarHided);
});
