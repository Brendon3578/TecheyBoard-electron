import { databaseConfig } from "./db.config.js";
import { showToastMessage } from "./utils.js";
import { showErrorMessageOnConsole } from "./error.js";
const mysql = require("mysql");

const connection = mysql.createConnection(databaseConfig);

function connectToDatabase() {
  let connectionError = null;

  connection.connect((error) => {
    if (error) {
      showErrorMessageOnConsole(error.code);
      showToastMessage("Falha na conexão com o Banco de Dados!");
      connectionError = error;
    } else {
      showToastMessage("Banco de Dados Conectado.");
    }
  });

  if (connectionError) {
    return "Falha no Banco de Dados!";
  } else {
    return "Banco de Dados Conectado";
  }
}

function findAllByTable(tableName) {
  connection.query(`SELECT * FROM ${tableName}`, (err, results, fields) => {
    if (err) {
      throw err;
    }
  });
}

export { connectToDatabase, connection };
