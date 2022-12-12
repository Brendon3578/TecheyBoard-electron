require("tw-elements");

import { Funcionario } from "../../../database/models/funcionario.js";
import { userData } from "../../../scripts/behaviour.js";
import { createUserOnTableRow } from "../../../scripts/dom-manipulation.js";
import { showToastMessage } from "../../../scripts/utils.js";

import { buildPageInformation } from "../../config/buildPageInformation.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { iconSVGElements } from "../../config/iconSVGElements.js";
import { ADMIN_PAGES_SIDEBAR_SECTIONS } from "../admin-page.config.js";

buildSidebar(ADMIN_PAGES_SIDEBAR_SECTIONS, "users");
buildPageInformation("Cadastro de Usuários", iconSVGElements.usersIcon);

/**
 * @typedef {import('../../types/type.js').user} user
 */

/**
 * @type user[]
 */
let users = [];

const usersTbodyEl = document.getElementById("users-tbody");

Funcionario.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];

      users.push({
        id: data.funcId,
        name: data.funcNome,
        email: data.funcEmail,
        contact: data.funcFone,
        registration: data.funcRegistration,
        role: data.funcCargo,
      });
    }
  })
  .then(() => {
    users.forEach((user) => {
      if (user.registration == "admin") return;
      console.log(user);
      createUserOnTableRow(usersTbodyEl, user);
    });
    // console.log(users);
    // if (users.length == 0) {
    //   createMessageAboutNousersFound(usersTbodyEl);
    // }
  });

let shouldUpdateDatabase = true;

const createUserFormEl = document.getElementById("create-form");
let existsRegistrationInDatabase = false;

createUserFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (shouldUpdateDatabase == false) return;

  const userNameInputValue = createUserFormEl.elements["username"].value;
  const registrationInputValue =
    createUserFormEl.elements["registration"].value;

  if (userNameInputValue.trim() == "" || registrationInputValue.trim() == "") {
    showToastMessage("Preencha os campos!", 4000);
  } else if (userNameInputValue.length < 5) {
    showToastMessage("Escreva um nome maior!", 4000);
  } else {
    if (verifyIfRegistrationExists(registrationInputValue))
      existsRegistrationInDatabase = true;

    if (existsRegistrationInDatabase) {
      showToastMessage("O Matrícula já existe no sistema!", 5000);
    } else {
      Funcionario.insert(
        registrationInputValue,
        userNameInputValue,
        "12345",
        "00000-0000",
        "email@email.com",
        "Funcionário"
      ).then(() => {
        shouldUpdateDatabase = false;

        showToastMessage(
          "Usuário criado com sucesso!\n\nA senha de acessso é 12345"
        );
        setTimeout(() => {
          location.reload();
        }, 7000);
      });
    }
  }
});
/**
 * @param {string} buttonId o Id do botão que será alterado o atributo Disable
 * @param {boolean} boolean o valor booleano no qual irá habilitar ou desabilitar o botão
 */
function setDisabledAtributeOnButtonEl(buttonId, boolean) {
  let buttonEl = document.getElementById(buttonId);

  if (boolean) buttonEl.setAttribute("disabled", "");
  else buttonEl.removeAttribute("disabled");
}

function verifyIfRegistrationExists(userRegistration) {
  let registrationExistsInDatabase = false;

  users.forEach((user) => {
    if (user.registration == userRegistration)
      registrationExistsInDatabase = true;
  });

  return registrationExistsInDatabase;
}

const modalEditInputsEl = {
  name: document.getElementById("username-input"),
  registration: document.getElementById("registration-input"),
  email: document.getElementById("email-input"),
  contact: document.getElementById("contact-input"),
  role: document.getElementById("role-input"),
};

const databaseColumnName = {
  name: "funcNome",
  registration: "funcRegistration",
  email: "funcEmail",
  contact: "funcFone",
  role: "funcCargo",
};

const databaseColumnLabel = {
  name: "Nome",
  registration: "Matrícula",
  email: "E-mail",
  contact: "Telefone",
  role: "Cargo",
};

let selectedUserId = 0;

const userNameLabelEls = document.querySelectorAll(".username-el");
function focusUserRow(e) {
  const radioInputValue = e.target.value;
  const userId = radioInputValue;

  console.log(radioInputValue);
  let selectedUser = users.find((user) => user.id == userId);

  Object.keys(modalEditInputsEl).forEach((keyName) => {
    modalEditInputsEl[keyName].value = selectedUser[keyName];
  });

  userNameLabelEls.forEach((element) => {
    element.innerHTML = `${selectedUser.role} <b>${selectedUser.name}</b>`;
  });

  // Quando clicar no input de Radios, irá setar a variável global
  // do id do agendamento, para o id do agendamento selecionado
  selectedUserId = userId;

  setDisabledAtributeOnButtonEl("btn-remove", false);
  setDisabledAtributeOnButtonEl("btn-edit", false);
}

const resetPasswordButtonEl = document.getElementById("btn-reset");

resetPasswordButtonEl.addEventListener("click", () => {
  if (selectedUserId == undefined || shouldUpdateDatabase == false) return;

  Funcionario.updateOneColumn(selectedUserId, "funcSenha", "12345").then(() => {
    shouldUpdateDatabase = false;

    showToastMessage("A senha foi resetada para 12345!");
    setTimeout(() => {
      location.reload();
    }, 5000);
  });
});

const deleteUserButtonEl = document.getElementById("delete-user-btn");

deleteUserButtonEl.addEventListener("click", () => {
  if (selectedUserId == undefined || shouldUpdateDatabase == false) return;

  Funcionario.deleteFromId(selectedUserId).then(() => {
    shouldUpdateDatabase = false;

    showToastMessage("Usuário deletado com sucesso!");
    setTimeout(() => {
      location.reload();
    }, 3000);
  });
});

const updateButtonEl = document.getElementById("update-btn");

updateButtonEl.addEventListener("click", (e) => {
  if (shouldUpdateDatabase == false) return;

  let selectedUser = users.find((user) => user.id == selectedUserId);

  Object.keys(modalEditInputsEl).forEach((keyName) => {
    if (modalEditInputsEl[keyName].value != selectedUser[keyName]) {
      if (
        verifyIfRegistrationExists(modalEditInputsEl.registration.value) &&
        keyName == "registration"
      ) {
        showToastMessage("A Matrícula já existe no sistema!", 5000);
      } else if (modalEditInputsEl[keyName].value.trim() == "") {
        showToastMessage(
          `Preencha o campo ${databaseColumnLabel[keyName]}!`,
          3000
        );
      } else {
        Funcionario.updateOneColumn(
          selectedUserId,
          databaseColumnName[keyName],
          modalEditInputsEl[keyName].value
        ).then(() => {
          shouldUpdateDatabase = false;
          showToastMessage(
            `O campo ${databaseColumnLabel[keyName]} foi atualizado com sucesso!`
          );
          setTimeout(() => {
            document.location.reload();
          }, 3000);
        });
      }
    }
  });
});

window.focusUserRow = focusUserRow;
