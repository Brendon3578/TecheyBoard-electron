import { connection } from "../db.js";
import { Model } from "./model.js";

class ControleChaveModel extends Model {
  create() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        create table if not exists tbControleChave (
          contChavId int primary key auto_increment,
          contChavDataPego datetime not null,
          contChavDataDevolver datetime not null,
          contChavControle varchar(50) not null,
          contChavQntdAula varchar(50) not null,
          contChavPeriodo varchar(50) not null,
          funcId int,
          salaId int
        );
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
    this.createRelationships();
  }

  createRelationships() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        alter table tbControleChave
        add constraint foreign key (funcId) REFERENCES tbFuncionario(funcId);
        alter table tbControleChave
        add constraint foreign key (salaId) REFERENCES tbSala(salaId);
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }

  // no controle chave é preciso sobrepor o método da classe pai (Model),
  // pois a entidade ControleChave tem relacionamentos
  findAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM tbControleChave
          JOIN tbSala ON tbSala.salaId = tbControleChave.salaId
          JOIN tbFuncionario ON tbFuncionario.funcId = tbControleChave.funcId;`,
        (err, rows, fields) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  insert(dataPego, dataDevolver, controle, qntdAula, periodo, funcId, salaId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        INSERT INTO tbControleChave (contChavDataPego, contChavDataDevolver, contChavControle, contChavQntdAula, contChavPeriodo, funcId, salaId)
        VALUES ('${dataPego}', '${dataDevolver}', '${controle}', '${qntdAula}', '${periodo}', '${funcId}', '${salaId}');
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}
export const ControleChave = new ControleChaveModel(
  "tbControleChave",
  "contChavId"
);
