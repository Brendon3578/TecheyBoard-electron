import { ChavesReservadas } from './data-mock.js';

const fazerHorarioComposto = (hour) => {
  return hour.getHours() + ":" + hour.getMinutes().toString();
}

for (const reserva of ChavesReservadas) {
  const labSelector = '#reserved-keys-lab-' + reserva.numeroLaboratorio
  const lab = document.querySelector(labSelector)

  const horarioInicialReservadoString = fazerHorarioComposto(reserva.horarioReservado.horarioPegado);
  const horarioFinalReservadoString = fazerHorarioComposto(reserva.horarioReservado.horarioDevolvido);

  const reservadoString = `Laboratório ${reserva.numeroLaboratorio} reservado à ${reserva.professor.nome}`

  let aulasString = reserva.horarioReservado.aulasPegadas.join('&ordf;, ') + '&ordf; aula';

  if (reserva.horarioReservado.aulasPegadas.length > 1) aulasString += 's';

  
  lab.innerHTML = lab.innerHTML += (
    '<li title="'+ reservadoString +' - ' +
    horarioInicialReservadoString
    +' - ' +
    horarioFinalReservadoString
    +'">' +
    '<span class="info">' +
      '<i class="ph-clock ph-lg"></i>' +
      aulasString +
    '</span>' +
    '<span>'+ reserva.professor.nome +'</span>' +
    '</li>'
  )
}