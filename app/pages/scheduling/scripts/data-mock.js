let ChavesReservadas = [
  // {
  //   id: 1,
  //   labNumber: 1,
  //   teacher: {
  //     name: "Roseli",
  //     RM: "12341",
  //   },
  //   scheduledTime: {
  //     keyTakenHour: new Date(new Date().setHours(7, 10)),
  //     keyReturnedHour: new Date(new Date().setHours(8, 50)),
  //     classesAmount: [1, 2],
  //   },
  // },
  // {
  //   id: 2,
  //   labNumber: 2,
  //   teacher: {
  //     name: "Antônio Cesar",
  //     RM: "51412",
  //   },
  //   scheduledTime: {
  //     keyTakenHour: new Date(new Date().setHours(7, 10)),
  //     keyReturnedHour: new Date(new Date().setHours(9, 40)),
  //     classesAmount: [1, 2, 3],
  //   },
  // },
  // {
  //   id: 3,
  //   labNumber: 2,
  //   teacher: {
  //     name: "Antônio Cesar",
  //     RM: "51412",
  //   },
  //   scheduledTime: {
  //     keyTakenHour: new Date(new Date().setHours(10)),
  //     keyReturnedHour: new Date(new Date().setHours(11, 40)),
  //     classesAmount: [4, 5],
  //   },
  // },
];

// sessionStorage.setItem("scheduling-keys", JSON.stringify(ChavesReservadas));

ChavesReservadas = JSON.parse(sessionStorage.getItem("scheduling-keys"));

if (ChavesReservadas == null || ChavesReservadas == undefined) {
  ChavesReservadas = [];
}

export { ChavesReservadas };
