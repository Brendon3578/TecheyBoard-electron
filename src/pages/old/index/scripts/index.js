import { connection } from "../../../scripts/db.js";
import { showToastMessage } from "../../../scripts/utils.js";

const RMinputEl = document.getElementById("login-rm");
const passwordInputEl = document.getElementById("login-password");
const usernameTextSpanEl = document.getElementById("username");

let users = [];

connection.query("SELECT * FROM tbFuncionario", (err, results, fields) => {
  if (err) {
    console.log(err);
    throw err;
  }
  for (let i = 0; i < results.length; i++) {
    const funcData = results[i];
    const userData = {
      id: funcData.funcId,
      RM: funcData.funcRm,
      name: funcData.funcNome,
      password: funcData.funcSenha,
      role: funcData.funcCargo,
    };

    users.push(userData);
  }
});

const showUsernameFadeInEffect = () => {
  let userRM = RMinputEl.value;

  usernameTextSpanEl.innerText = "&nbsp;";
  usernameTextSpanEl.classList.remove("activeAnimation");
  passwordInputEl.setAttribute("disabled", true);

  if (userRM.length == 5) {
    let databaseUsername = users.find((user) => user.RM === userRM);

    if (databaseUsername) {
      usernameTextSpanEl.innerText = databaseUsername.name;
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
      sessionStorage.setItem(
        "user",
        JSON.stringify({ id: user.id, name: user.name, RM: user.RM })
      );
      redirectUserToCalendarApplication();
    } else {
      showToastMessage("Senha incorreta!");
    }
  }
});

const redirectUserToCalendarApplication = () => {
  document.location.href = "../scheduling/scheduling.html";
};

window.showUsernameFadeInEffect = showUsernameFadeInEffect;
