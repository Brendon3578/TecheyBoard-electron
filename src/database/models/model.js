import { connection } from "../db.js";

export class Model {
  constructor(tableName, idColumnName) {
    this.tableName = tableName;
    this.idColumnName = idColumnName;
  }

  create() {}

  findAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${this.tableName}`,
        (err, rows, fields) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${this.tableName} WHERE ${this.idColumnName} = ${id}`,
        (err, rows, fields) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  updateOneColumn(id, columnName, newValue) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${this.tableName} SET ${columnName} = '${newValue}' WHERE ${this.idColumnName} = ${id};`,
        (err, rows, fields) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  deleteTable() {
    return new Promise((resolve, reject) => {
      connection.query(`DROP TABLE ${this.tableName};`, (err, rows, fields) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  deleteFromId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM ${this.tableName} WHERE ${this.idColumnName} = ${id};`,
        (err, rows, fields) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}
