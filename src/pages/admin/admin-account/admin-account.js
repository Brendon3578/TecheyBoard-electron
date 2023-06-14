import { Funcionario } from "../../../database/models/funcionario.js";
import { saveUserData, userData } from "../../../scripts/behaviour.js";
import { formatDate, showToastMessage } from "../../../scripts/utils.js";

import { buildPageInformation } from "../../config/buildPageInformation.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { iconSVGElements } from "../../config/iconSVGElements.js";
import { ADMIN_PAGES_SIDEBAR_SECTIONS } from "../admin-page.config.js";

buildSidebar(ADMIN_PAGES_SIDEBAR_SECTIONS, "admin-account");
buildPageInformation("Configurações da Conta", iconSVGElements.accountIcon);

const usernameInputEl = document.getElementById("username-input");
const emailInputEl = document.getElementById("email-input");
const roleInputEl = document.getElementById("role-input");
const contactInputEl = document.getElementById("contact-input");

const accountConfigList = [
  {
    element: emailInputEl,
    configName: "email",
    label: "E-mail",
    databaseColumnName: "funcEmail",
  },
  {
    element: contactInputEl,
    configName: "contact",
    label: "Telefone de Contato",
    databaseColumnName: "funcFone",
  },
  {
    element: roleInputEl,
    configName: "role",
    label: "Cargo",
    databaseColumnName: "funcCargo",
  },
  {
    element: usernameInputEl,
    configName: "name",
    label: "Nome Completo",
    databaseColumnName: "funcNome",
  },
];

// Variável que evitará o usuário ficar atualizando o banco de dados toda vez
// para evitar sobrecarga
let shouldUpdateDatabase = true;

accountConfigList.forEach((config) => {
  config.element.setAttribute("value", userData[config.configName]);
});

const accountConfigForm = document.getElementById("account-form");

accountConfigForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (shouldUpdateDatabase == false) return;

  accountConfigList.forEach((accountConfig) => {
    if (accountConfig.element.value != userData[accountConfig.configName]) {
      // Atualizar no banco de dados apenas os campos que foram modificados
      // na interface

      userData[accountConfig.configName] = accountConfig.element.value;
      saveUserData();

      Funcionario.updateOneColumn(
        userData.id,
        accountConfig.databaseColumnName,
        accountConfig.element.value
      ).then(() => {
        shouldUpdateDatabase = false;
        showToastMessage(
          `Campo ${accountConfig.label} atualizado com sucesso`,
          2000
        );
        setTimeout(() => {
          document.location.reload();
        }, 3000);
      });
    }
  });
});

const cancelSubmitButtonEl = document.getElementById("cancel-btn");

cancelSubmitButtonEl.addEventListener("click", () => {
  document.location.reload();
});

// Efeito de visualizar ou não visualizar a senha (efeito do icone de olho)
document.querySelectorAll(".input-group--password__icon").forEach((el) => {
  el.addEventListener("click", (e) => {
    const passwordEyeIconEl = e.target;

    const passwordEl = document.getElementById(
      passwordEyeIconEl.dataset.passwordId
    );

    if (passwordEl.getAttribute("type") == "password") {
      passwordEl.setAttribute("type", "text");
      passwordEyeIconEl.innerHTML = iconSVGElements.passwordEyeSlashIcon;
    } else if (passwordEl.getAttribute("type") == "text") {
      passwordEl.setAttribute("type", "password");
      passwordEyeIconEl.innerHTML = iconSVGElements.passwordEyeIcon;
    }
  });
});

const newPasswordFormEl = document.getElementById("new-password-form");

newPasswordFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (shouldUpdateDatabase == false) return;

  const formData = {
    newPassword: newPasswordFormEl.elements["new-password-input"].value,
    confirmNewPassword:
      newPasswordFormEl.elements["confirm-new-password-input"].value,
  };

  if (
    formData.newPassword.trim() == "" ||
    formData.confirmNewPassword.trim() == ""
  ) {
    showToastMessage("Preencha o campo!");
    return;
  }

  if (formData.newPassword == formData.confirmNewPassword) {
    Funcionario.updateOneColumn(userData.id, "funcSenha", formData.newPassword)
      .then(() => {
        shouldUpdateDatabase = false;
        showToastMessage("Senha trocada com sucesso!");
        setTimeout(() => {
          document.location.reload();
        }, 2000);
      })
      .catch((reason) => {
        showToastMessage(
          "Erro ao trocar a senha, por favor entre em contato com a Coordenação",
          8000,
          "alert"
        );
        console.log(reason);
      });
  } else {
    showToastMessage("As senhas não são iguais!");
  }
});
