import { ChavesReservadas } from "./data-mock.js";
import { formatDate } from "./utils.js";

console.log(ChavesReservadas);
for (const reserva of ChavesReservadas) {
  const labSelector = "#reserved-keys-lab-" + reserva.labNumber;
  const noKeyInUseTextEl = document.querySelector(
    labSelector + " .reserved-keys__nothing"
  );

  noKeyInUseTextEl.classList.add("hidden");

  const lab = document.querySelector(labSelector);

  const horarioInicialReservadoString = formatDate(
    new Date(reserva.scheduledTime.keyTakenHour),
    "HH:MM"
  );
  const horarioFinalReservadoString = formatDate(
    new Date(reserva.scheduledTime.keyReturnedHour),
    "HH:MM"
  );

  const reservadoString = `Laboratório ${reserva.labNumber} reservado à ${reserva.teacher.name}`;

  let aulasString =
    reserva.scheduledTime.classesAmount.join("&ordf;, ") + "&ordf; aula";
  if (reserva.scheduledTime.classesAmount.length > 1) aulasString += "s";

  lab.innerHTML = lab.innerHTML +=
    '<li class="reserved-keys__item" title="' +
    reservadoString +
    " - " +
    horarioInicialReservadoString +
    " - " +
    horarioFinalReservadoString +
    '">' +
    '<span class="info">' +
    '<i class="ph-clock ph-lg"></i>' +
    aulasString +
    "</span>" +
    "<span>" +
    reserva.teacher.name +
    "</span>" +
    "</li>";
}
