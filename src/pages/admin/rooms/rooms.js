require("tw-elements");

import { Sala } from "../../../database/models/sala.js";
import { userData } from "../../../scripts/behaviour.js";
import {
  createMessageAboutNoRoomsFound,
  createRoomOnTableRow,
} from "../../../scripts/dom-manipulation.js";
import { showToastMessage } from "../../../scripts/utils.js";

import { buildPageInformation } from "../../config/buildPageInformation.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { iconSVGElements } from "../../config/iconSVGElements.js";
import { ADMIN_PAGES_SIDEBAR_SECTIONS } from "../admin-page.config.js";

buildSidebar(ADMIN_PAGES_SIDEBAR_SECTIONS, "rooms");
buildPageInformation("Cadastro de Salas", iconSVGElements.roomsIcon);

/**
 * @typedef {import('../../types/type.js').room} room
 */

/**
 * @type room[]
 */
let rooms = [];

const roomsTbodyEl = document.getElementById("rooms-tbody");

Sala.findAll()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];

      rooms.push({
        id: data.salaId,
        roomName: data.salaDesc,
        status: data.salaSituacao,
      });
    }
  })
  .then(() => {
    rooms.forEach((room) => {
      console.log(room);
      createRoomOnTableRow(roomsTbodyEl, room);
    });
    console.log(rooms);
    if (rooms.length == 0) {
      createMessageAboutNoRoomsFound(roomsTbodyEl);
    }
  });

let shouldUpdateDatabase = true;

const createRoomFormEl = document.getElementById("create-form");

createRoomFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (shouldUpdateDatabase == false) return;

  const newLabInputValue = createRoomFormEl.elements["new-lab-name"].value;

  if (newLabInputValue.trim() == "") {
    showToastMessage("Insira um nome para a Sala!");
  } else {
    Sala.insert(newLabInputValue, "NORMAL").then(() => {
      shouldUpdateDatabase = false;

      showToastMessage("Sala criada com sucesso!");
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  }
});
/**
 * @param {string} buttonId o Id do bot??o que ser?? alterado o atributo Disable
 * @param {boolean} boolean o valor booleano no qual ir?? habilitar ou desabilitar o bot??o
 */
function setDisabledAtributeOnButtonEl(buttonId, boolean) {
  let buttonEl = document.getElementById(buttonId);

  if (boolean) buttonEl.setAttribute("disabled", "");
  else buttonEl.removeAttribute("disabled");
}

const labNameInput = document.getElementById("lab-name-input");

let selectedRoomId = 0;

function focusRoomRow(e) {
  const radioInputValue = e.target.value;
  const roomId = radioInputValue.split("-")[0];
  const roomStatus = radioInputValue.split("-")[1];
  const roomName = radioInputValue.split("-")[2];

  console.log(radioInputValue);

  // Quando clicar no input de Radios, ir?? setar a vari??vel global
  // do id do agendamento, para o id do agendamento selecionado
  selectedRoomId = roomId;

  labNameInput.value = roomName;

  setDisabledAtributeOnButtonEl("btn-remove", false);
  setDisabledAtributeOnButtonEl("btn-edit", false);
}

const deleteRoomButtonEl = document.getElementById("delete-room-btn");

deleteRoomButtonEl.addEventListener("click", () => {
  if (selectedRoomId == undefined || shouldUpdateDatabase == false) return;

  Sala.deleteFromId(selectedRoomId).then(() => {
    shouldUpdateDatabase = false;

    showToastMessage("Sala deletada com sucesso!");
    setTimeout(() => {
      location.reload();
    }, 3000);
  });
});

const updateLabForm = document.getElementById("edit-form");
const updateButtonEl = document.getElementById("update-btn");

updateButtonEl.addEventListener("click", (e) => {
  if (shouldUpdateDatabase == false) return;

  const formData = {
    labName: updateLabForm.elements["lab"].value,
    status: updateLabForm.elements["status"].value,
  };

  Sala.updateOneColumn(selectedRoomId, "salaDesc", formData.labName);
  Sala.updateOneColumn(selectedRoomId, "salaSituacao", formData.status);

  showToastMessage("Altera????es salvas com sucesso");
  shouldUpdateDatabase = false;

  setTimeout(() => {
    document.location.reload();
  }, 3000);
});

/*
 * NOTA DO AUTOR DESSE SISTEMA:
 * Esse projeto foi feito a partir de muito esfor??o pr??prio,
 * A Etec de Sapopemba n??o me ensinou NADA sobre como produzir isso ou quais
 * ferramentas eu deveria seguir para produzir isso,
 * apenas alguns ??nicos professores da parte do ensino t??cnico realmente
 * conseguiram me ensinar, tanto que eu queria agradecer ao
 * Toninho (professor de BD e da parte de TCC) e ??
 * professora Roseli (um amor de pessoa que me deu um start
 * no meu conhecimento sobre Linguagens de programa????o)
 * essa Etec tem uma grande deficit em quest??o do ensino T??cnico e da gest??o,
 * muitas das vezes por professores que possuem um conhecimentos atrasados
 * em rela????o ??s tecnologias do mercado, no que tange a respeito da gest??o do ensino,
 * a coordena????o acaba que tem uma grande falha na comunica????o entre coordena????o e aluno,
 * muitas das mensagens s??o enviadas para os alunos em ??ltima hora e acaba ocorrendo
 * diversas falhas na comunica????o.
 */

window.focusRoomRow = focusRoomRow;
