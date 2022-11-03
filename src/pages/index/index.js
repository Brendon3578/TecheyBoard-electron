// import { connection } from "../../scripts/db.js";
import { database } from "../../database/db.js";
import { showToastMessage } from "../../scripts/utils.js";
import { Funcionario } from "./../../database/models/funcionario.js";

let users = [];
const loadingInterfaceEl = document.getElementById("loading");
const loadingMessageEl = document.getElementById("loading__message");
const alertMessageEl = document.getElementById("alert");

loadingInterfaceEl.addEventListener("dblclick", (event) => {
  loadingInterfaceEl.style.display = "none";
});

database
  .connect()
  .then(() => {
    setTimeout(() => {
      loadingMessageEl.innerText = "Banco de Dados Conectado";
    }, 1000);
    setTimeout(() => {
      loadingInterfaceEl.style.display = "none";
    }, 3500);
  })
  .catch((reason) => {
    loadingMessageEl.innerText = "Banco de Dados não foi conectado!";
    alertMessageEl.style.display = "block";
  });

database.createAllTables();

Funcionario.findAll().then((results) => {
  console.log(results);
  for (let i = 0; i < results.length; i++) {
    const funcData = results[i];
    users.push({
      id: funcData.funcId,
      registration: funcData.funcRegistration,
      name: funcData.funcNome,
      password: funcData.funcSenha,
      role: funcData.funcCargo,
    });
  }
});

const registrationInputEl = document.getElementById("login-registration");
const passwordInputEl = document.getElementById("login-password");
const usernameTextSpanEl = document.getElementById("username");

const showUsernameFadeInEffect = () => {
  let userRegistrationValue = registrationInputEl.value;

  usernameTextSpanEl.innerText = "Professor(a)";
  usernameTextSpanEl.classList.remove("show-up-animation");
  passwordInputEl.setAttribute("disabled", true);

  if (userRegistrationValue.length == 5) {
    let usernameGotFromDatabase = users.find(
      (user) => user.registration === userRegistrationValue
    );

    if (usernameGotFromDatabase) {
      usernameTextSpanEl.innerText = usernameGotFromDatabase.name;
      usernameTextSpanEl.classList.add("show-up-animation");
      passwordInputEl.removeAttribute("disabled");
    } else {
      console.log("Não encontrado!");
      setTimeout(() => {
        showToastMessage(
          "Usuário não encontrado no Sistema!\nPor favor, faça um cadastro com a secretaria!"
        );
      }, 1000);
    }
  }
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = users.find(
    (user) => user.registration === loginForm.elements["registration"].value
  );

  if (user != undefined) {
    if (user.password === loginForm.elements["password"].value) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ id: user.id, name: user.name, RM: user.RM })
      );
      redirectUserToCalendarApplication();
    } else {
      showToastMessage(
        "Senha incorreta. Tente novamente ou entre em contato com a secretaria para redefini-la."
      );
    }
  }
});

const redirectUserToCalendarApplication = () => {
  document.location.href = "../calendar/calendar.html";
};

const restartApplication = () => {
  document.location.reload();
};

window.showUsernameFadeInEffect = showUsernameFadeInEffect;
window.restartApplication = restartApplication;
