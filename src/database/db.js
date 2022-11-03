import { databaseConfig } from "./db.config.js";
import { showErrorMessageOnConsole } from "../scripts/error.js";
import { Funcionario } from "./models/funcionario.js";
import { Sala } from "./models/sala.js";

const mysql = require("mysql");

const connection = mysql.createConnection(databaseConfig);

const database = {
  connect: () => {
    return new Promise((resolve, reject) => {
      connection.connect((error) => {
        if (error) {
          showErrorMessageOnConsole(error.code);
          console.log(error);
          reject(error);
        } else {
          resolve();
          console.log("Banco de Dados Conectado.");
        }
      });
    });
  },
  close: () => {
    connection.end((error) => {
      if (error) {
        showErrorMessageOnConsole(error.code);
        console.log(error);
      }
    });
  },
  createAllTables: () => {
    Funcionario.create();
    Sala.create();
  },
};

export { database, connection };
