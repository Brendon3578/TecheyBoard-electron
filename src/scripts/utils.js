const Toastify = require("toastify-js");

/**
 * Exibir uma notificação 'toast' em tela.
 *
 * @param {string} message A mensagem que será mostrado na notificação.
 * @param {number} duration Os milissegundos que a mensagem ficará na tela, por padrão: 8000 milissegundos (8 segundos).
 * @param {'info' | 'alert'} type O estilo do erro da mensagem, por padrão é de "alert"
 */
function showToastMessage(message, duration = 8000, type = "info") {
  const toastMessageColorList = {
    info: "linear-gradient(to right, #6b21a8, #7e22ce)",
    alert: "linear-gradient(to right, #b91c1c, #dc2626)",
  };

  Toastify({
    text: message,
    duration: duration,
    close: true,
    style: {
      background: toastMessageColorList[type],
    },
  }).showToast();
}

const monthList = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/**
 * Formatar a data inserida utilizando um tipo de formatação de data válido.
 *
 * @param {Date} date A data que será formatada.
 *
 * @param {'YYYY-MM-DD' | 'HH:MM' | 'HH:MM -withoutZero' | 'DD/MM/YYYY -long' | 'DD/MM/YYYY' | 'YYYY-MM-DD HH:MM:SS' | 'MM/YY --long' | 'DD/MM'} formatType O tipo de formatação de data válido.
 *
 * As formatações possíveis:
 * - "YYYY-MM-DD": 2022/09/24,
 * - "HH:MM": 07:23,
 * - "DD/MM/YYYY" -long": 30 de ago. de 2022,
 * - "YYYY-MM-DD HH:MM:SS": 2022/06/10 21:48:30
 * - "MM/YY --long": Novembro de 2022
 * - "DD/MM": 05 de Nov.
 *
 * @author Brendon Gomes
 */
function formatDate(date, formatType) {
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();

  let hour = date.getHours().toString().padStart(2, "0");
  let hourWithoutZero = date.getHours();

  let minute = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  switch (formatType) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "HH:MM":
      return `${hour}:${minute}`;
    case "HH:MM -withoutZero":
      return `${hourWithoutZero}:${minute}`;
    case "DD/MM/YYYY -long":
      return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY-MM-DD HH:MM:SS":
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    case "DD/MM":
      return `${day} de ${monthList[parseInt(month - 1)].slice(0, 3)}.`;
    case "MM/YY --long":
      return `${monthList[parseInt(month - 1)]} de ${year}`;
    default:
      throw "Erro, insira um tipo de formatação de data válido";
  }
}

/**
 * Irá retornar a data do próximo dia da semana, exemplo: hoje é domingo dia 11,
 * então irá retornar o dia 18
 *
 * @param {Date} date A data
 *
 * @param { 0 | 1 | 2 | 3 | 4 | 5 | 6 } dayWeek O dia da semana, 0, para Domingo a até 6, para Sábado
 *
 * Autor: {@link https://bobbyhadz.com/blog/javascript-get-date-of-next-friday Borislav Hadzhiev}
 */
function getNextDayOfTheWeek(date = new Date(), dayWeek) {
  const dateCopy = new Date(date.getTime());

  const nextDayWeek = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + dayWeek) % 7 || 7)
    )
  );

  return nextDayWeek;
}

/**
 * Irá retornar o último carácter de uma String
 * @param {string} string A string do qual será extraído o último carácter
 * @author Brendon Gomes
 */
const getLastCharOfAString = (string) => string.substring(string.length - 1);

/**
 * @param {string} string A String no qual a primeira letra estará em uppercase (letra maiúscula)
 * @returns  String com a primeira letra em uppercase
 */
const capitalizeString = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const isDateValid = (date) => date instanceof Date && !isNaN(date);

export {
  showToastMessage,
  formatDate,
  getLastCharOfAString,
  capitalizeString,
  getNextDayOfTheWeek,
  isDateValid,
};
