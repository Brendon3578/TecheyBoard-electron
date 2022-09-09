const Toastify = require("toastify-js");

const showToastMessage = (message) => {
  Toastify({
    text: message,
    duration: 8000,
    style: {
      background: "linear-gradient(to right, #6b21a8, #7e22ce)",
    },
  }).showToast();
};

const RMinputEl = document.getElementById("login-rm");
const passwordInputEl = document.getElementById("login-password");
const usernameTextSpanEl = document.getElementById("username");

const users = [
  { RM: "12345", user: "Antônio Cesar", password: "123" },
  { RM: "12346", user: "Roseli Lovato", password: "123" },
  { RM: "13231", user: "Brendon Gomes", password: "123" },
];

const showUsernameFadeInEffect = () => {
  let userRM = RMinputEl.value;

  usernameTextSpanEl.innerText = "&nbsp;";
  usernameTextSpanEl.classList.remove("activeAnimation");
  passwordInputEl.setAttribute("disabled", true);

  if (userRM.length == 5) {
    let databaseUsername = users.find((user) => user.RM === userRM);

    if (databaseUsername) {
      usernameTextSpanEl.innerText = databaseUsername.user;
      usernameTextSpanEl.classList.add("activeAnimation");
      passwordInputEl.removeAttribute("disabled");
    } else {
      console.log("Não encontrado!");
      setTimeout(() => {
        showToastMessage(
          "Usuário não encontrado no Sistema!\n\nPor favor faça um cadastro com a secretaria!"
        );
      }, 1000);
    }
  }
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = users.find((user) => user.RM === loginForm.elements["rm"].value);

  if (user != undefined) {
    if (user.password === loginForm.elements["password"].value) {
      sessionStorage.setItem("user", JSON.stringify(user));
      redirectUserToCalendarApplication();
    } else {
      showToastMessage("Senha incorreta!");
    }
  }
});

const redirectUserToCalendarApplication = () => {
  document.location.href = "../scheduling/scheduling.html";
};
