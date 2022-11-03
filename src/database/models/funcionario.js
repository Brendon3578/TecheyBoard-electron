import { connection } from "../db.js";
import { Model } from "./model.js";

class FuncionarioModel extends Model {
  create() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        create table if not exists tbFuncionario(
          funcId int primary key auto_increment,
          funcNome varchar(50) NOT NULL,
          funcSenha varchar(50) NOT NULL,
          funcFone varchar(50) NOT NULL,
          funcEmail varchar(50) NOT NULL,
          funcRegistration varchar(50) NOT NULL,
          funcCargo varchar(50) NOT NULL
        );
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
  insert(registration, nome, senha, fone, email, cargo) {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        INSERT INTO tbFuncionario (
          funcRegistration, funcNome, funcSenha,
          funcFone, funcEmail, funcCargo
        )
        VALUES (
          '${registration}', '${nome}', '${senha}',
          '${fone}', '${email}', '${cargo}'
        );
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}
export const Funcionario = new FuncionarioModel("tbFuncionario", "funcId");
