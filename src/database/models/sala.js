import { connection } from "../db.js";
import { Model } from "./model.js";

class SalaModel extends Model {
  create() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        create table if not exists tbSala(
          salaId int primary key auto_increment,
          salaDesc varchar(50) NOT NULL,
          salaSituacao varchar(50) NOT NULL
        );
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
  insert(desc, situacao) {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        INSERT INTO tbSala (salaDesc, salaSituacao)
        VALUES ('${desc}', '${situacao}');
      `,
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}
export const Sala = new SalaModel("tbSala", "salaId");
