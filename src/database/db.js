import { databaseConfig } from "./db.config.js";
import { showErrorMessageOnConsole } from "../scripts/error.js";
import { Funcionario } from "./models/funcionario.js";
import { Sala } from "./models/sala.js";
import { ControleChave } from "./models/controleChave.js";

const mysql = require("mysql");

/*
 * TODO:
 * FAZER UMA QUERY QUE CRIE O BANCO DE DADOS, E NÃO APENAS UTILIZAR UM JÁ FOI CRIADO
 */

const connection = mysql.createConnection(databaseConfig);

const database = {
  init: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "CREATE DATABASE IF NOT EXISTS bdClaviculario",
        (error) => {
          if (error) {
            showErrorMessageOnConsole(error.code);
            console.log(error);
            reject(error);
          } else {
            resolve();
            console.log("Banco de Dados bdClaviculario Criado com sucesso.");
          }
        }
      );
    });
  },
  connect: () => {
    return new Promise((resolve, reject) => {
      connection.query("USE bdClaviculario;", (error) => {
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
    ControleChave.create();
  },
};

database.init();
database.connect();

export { database, connection };
