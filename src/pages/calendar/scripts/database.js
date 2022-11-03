import { connection } from "../../../scripts/db.js";
import { formatDate } from "../../../scripts/utils.js";

/**
 * @typedef {import('../../types/type').lab } lab
 * @typedef {import('../../types/type').scheduledKey } scheduledKey
 */

/** @type {scheduledKey[]} */
let scheduledKeysList = [];

connection.query(
  `SELECT *
  FROM tbControleChave
  JOIN tbSala ON tbSala.salaId = tbControleChave.salaId
  JOIN tbFuncionario ON tbFuncionario.funcId = tbControleChave.funcId;`,
  (err, results, fields) => {
    if (err) {
      console.log(err);
      throw err;
    }
    for (let i = 0; i < results.length; i++) {
      const scheduledKeyData = results[i];

      scheduledKeysList.push({
        id: scheduledKeyData.contChavId,
        lab: {
          id: scheduledKeyData.salaId,
          name: scheduledKeyData.salaDesc,
        },
        scheduledTime: {
          classesAmount: scheduledKeyData.contChavQntdAula.split("-"),
          keyTakenHour: scheduledKeyData.contChavDataPego,
          keyReturnedHour: scheduledKeyData.contChavDataDevolver,
        },
        status: scheduledKeyData.salaSituacao,
        teacher: {
          id: scheduledKeyData.funcId,
          name: scheduledKeyData.funcNome,
          rm: scheduledKeyData.funcRm,
        },
      });
    }
  }
);

/**
 * @type {lab[]}
 */
let labList = [];

connection.query("SELECT * FROM tbSala", (err, results, fields) => {
  if (err) {
    console.log(err);
    throw err;
  }
  for (let i = 0; i < results.length; i++) {
    const labData = results[i];

    labList.push({
      id: labData.salaId,
      labName: labData.salaDesc,
      status: labData.salaSituacao,
    });
  }
});

setTimeout(() => {
  console.log(scheduledKeysList);
}, 1000);

function getScheduledKeyList() {
  return JSON.parse(sessionStorage.getItem("scheduling-keys"));
}

/**
 *
 * @param {scheduledKey} scheduleKey
 */
function postScheduledKeyListOnDatabase(scheduleKey) {
  const contChaveDataPegoDateTime = formatDate(
    scheduleKey.scheduledTime.keyTakenHour,
    "YYYY-MM-DD HH:MM:SS"
  );

  const contChavDataDevolverDateTime = formatDate(
    scheduleKey.scheduledTime.keyReturnedHour,
    "YYYY-MM-DD HH:MM:SS"
  );

  const contChavControleVarChar = scheduleKey.status;

  const contChavQntdAulaVarChar =
    scheduleKey.scheduledTime.classesAmount.join("-");

  const funcIdInt = scheduleKey.teacher.id;

  const salaIdInt = scheduleKey.lab.id;

  connection.query(
    "INSERT INTO tbControleChave (contChavDataPego, contChavDataDevolver, contChavControle, contChavQntdAula, funcId, salaId) VALUES (?, ?, ?, ?, ?, ?);",
    [
      contChaveDataPegoDateTime,
      contChavDataDevolverDateTime,
      contChavControleVarChar,
      contChavQntdAulaVarChar,
      funcIdInt,
      salaIdInt,
    ],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
}

scheduledKeysList = getScheduledKeyList();

if (scheduledKeysList == null || scheduledKeysList == undefined) {
  scheduledKeysList = [];
}

// format scheduledKey Date
for (const scheduledKey of scheduledKeysList) {
  scheduledKey.scheduledTime.keyReturnedHour = new Date(
    scheduledKey.scheduledTime.keyReturnedHour
  );
  scheduledKey.scheduledTime.keyTakenHour = new Date(
    scheduledKey.scheduledTime.keyTakenHour
  );
}

export { scheduledKeysList, labList, postScheduledKeyListOnDatabase };
