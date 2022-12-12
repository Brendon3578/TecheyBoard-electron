/**
 * @typedef {import('../types/type.js').user} user
 */

import { database } from "../../database/db.js";
import { formatDate, showToastMessage } from "../../scripts/utils.js";
import { iconSVGElements } from "../config/iconSVGElements.js";
import { Funcionario } from "./../../database/models/funcionario.js";

const loadingInterfaceEl = document.getElementById("loading");
const loadingMessageEl = document.getElementById("loading__message");
const alertMessageEl = document.getElementById("alert");

/**
 * @type user[]
 */
let users = [];

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

Funcionario.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const funcData = results[i];
      users.push({
        id: funcData.funcId,
        registration: funcData.funcRegistration,
        name: funcData.funcNome,
        password: funcData.funcSenha,
        role: funcData.funcCargo,
        email: funcData.funcEmail,
        contact: funcData.funcFone,
      });
    }
  })
  .then(() => {
    if (users.length == 0) {
      Funcionario.insert(
        "admin",
        "Administrador",
        12345,
        "00000-0000",
        "administrador@email.com",
        "Coordenador"
      ).then(() => {
        showToastMessage(
          "Usuário ADMINISTRADOR criado com sucesso, Bem-vindo ao Techeybord :D",
          2000
        );
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
    } else if (users.length == 1) {
      showToastMessage(
        "Para acessar o Techeybord entre com o seguinte login:\nMatrícula: admin\nSenha: 12345",
        10000
      );
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

  if (userRegistrationValue.length != 0) {
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

  let currentUser = users.find(
    (user) => user.registration === loginForm.elements["registration"].value
  );

  if (currentUser != undefined) {
    if (currentUser.password === loginForm.elements["password"].value) {
      saveUserDataOnSessionStorage(currentUser);

      if (currentUser.registration == "admin") {
        redirectAdminToAdminDashboard();
      } else {
        redirectUserToCalendarApplication();
      }
    } else if (
      // SENHA SECUNDÁRIA PARA ACESSSO AO ADMIN: data atual + "- arduino" exemplo:
      // "2022-11-23-arduino"
      currentUser.registration == "admin" &&
      loginForm.elements["password"].value == "etecdesapopemba172"
    ) {
      saveUserDataOnSessionStorage(currentUser);
      redirectAdminToAdminDashboard();
    } else {
      showToastMessage(
        "Senha incorreta. Tente novamente ou entre em contato com a secretaria para redefini-la."
      );
    }
  }
});

/**
 * @param {user} currentUser
 */
function saveUserDataOnSessionStorage(currentUser) {
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      id: currentUser.id,
      name: currentUser.name,
      registration: currentUser.registration,
      contact: currentUser.contact,
      role: currentUser.role,
      email: currentUser.email,
    })
  );
}

const redirectUserToCalendarApplication = () => {
  document.location.href = "../user/calendar/calendar.html";
};

const redirectAdminToAdminDashboard = () => {
  document.location.href = "../admin/dashboard/dashboard.html";
};

const restartApplication = () => {
  document.location.reload();
};

// Efeito de visualizar ou não visualizar a senha (efeito do icone de olho)
document.querySelectorAll(".input-group--password__icon").forEach((el) => {
  el.addEventListener("click", (e) => {
    const passwordEyeIconEl = e.target;

    const passwordEl = document.getElementById(
      passwordEyeIconEl.dataset.passwordId
    );

    if (passwordEl.getAttribute("disabled") != null) return;

    if (passwordEl.getAttribute("type") == "password") {
      passwordEl.setAttribute("type", "text");
      passwordEyeIconEl.innerHTML = iconSVGElements.passwordEyeSlashIcon;
    } else if (passwordEl.getAttribute("type") == "text") {
      passwordEl.setAttribute("type", "password");
      passwordEyeIconEl.innerHTML = iconSVGElements.passwordEyeIcon;
    }
  });
});

window.showUsernameFadeInEffect = showUsernameFadeInEffect;
window.restartApplication = restartApplication;
