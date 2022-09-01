export const ChavesReservadas = [
  {
    idRersevado: 1,
    numeroLaboratorio: 1,
    professor: {
      nome: 'Roseli',
      RM: '12341'
    },
    horarioReservado: {
      horarioPegado: new Date(new Date().setHours(7,10)),
      horarioDevolvido: new Date(new Date().setHours(8,50)),
      aulasPegadas: [1,2]
    }
  },
  {
    idRersevado: 2,
    numeroLaboratorio: 2,
    professor: {
      nome: 'Antônio Cesar',
      RM: '51412'
    },
    horarioReservado: {
      horarioPegado: new Date(new Date().setHours(7,10)),
      horarioDevolvido: new Date(new Date().setHours(9,40)),
      aulasPegadas: [1,2,3]
    }
  },
  {
    idRersevado: 3,
    numeroLaboratorio: 2,
    professor: {
      nome: 'Antônio Cesar',
      RM: '51412'
    },
    horarioReservado: {
      horarioPegado: new Date(new Date().setHours(7,10)),
      horarioDevolvido: new Date(new Date().setHours(8,50)),
      aulasPegadas: [4,5]
    }
  },
] 