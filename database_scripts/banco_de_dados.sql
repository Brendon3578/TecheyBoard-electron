-- Abrir esse arquivo no MySql Workshop
drop database bdClaviculario;
create database bdClaviculario;
use bdClaviculario;
-- drop table tbSala;
-- drop table tbFuncionario;
-- drop table tbControleChave;
create table tbSala(
  salaId int primary key auto_increment,
  salaDesc varchar(50) NOT NULL,
  salaSituacao varchar(50) NOT NULL
);
create table tbFuncionario(
  funcId int primary key auto_increment,
  funcNome varchar(50) NOT NULL,
  funcSenha varchar(50) NOT NULL,
  funcFone varchar(50) NOT NULL,
  funcEmail varchar(50) NOT NULL,
  funcRegistration varchar(50) NOT NULL,
  funcCargo varchar(50) NOT NULL
);
-- contChavControle pode ser: SCHEDULED (agendado), USING (usando), RETURNED (devolvido)
-- contChavPeriodo pode ser: MORNING (manhã), AFTERNOON (tarde), NIGHT (noite)
create table tbControleChave (
  contChavId int primary key auto_increment,
  contChavDataPego datetime not null,
  contChavDataDevolver datetime not null,
  contChavControle varchar(50) not null,
  contChavQntdAula varchar(50) not null,
  contChavPeriodo varchar(50) not null,
  funcId int,
  salaId int
);
alter table tbControleChave
add constraint foreign key (funcId) REFERENCES tbFuncionario(funcId);
alter table tbControleChave
add constraint foreign key (salaId) REFERENCES tbSala(salaId);
-- NORMAL para indicar que pode ser a sala pode ser agendada normalmente,
-- MAINTENANCE para em manuntenção
INSERT INTO tbSala (salaDesc, salaSituacao)
VALUES ('Sala de informática 1 / Maker', 'NORMAL'),
  ('Sala de informática 2', 'NORMAL'),
  ('Sala de informática 3', 'MAINTENANCE');
INSERT INTO tbFuncionario (
    funcRegistration,
    funcNome,
    funcSenha,
    funcFone,
    funcEmail,
    funcCargo
  )
VALUES (
    '12345',
    'Antônio Cesar',
    '123',
    '11 95412 3013',
    'antoniocesar97@etec.sp.gov.br',
    'Professor'
  ),
  (
    '13231',
    'Brendon Gomes da Silva',
    '123',
    '11 95125 1512',
    'brendon.silva13@etec.sp.gov.br',
    'Professor'
  ),
  (
    'admin',
    'Admnistrador',
    'admin',
    '000000000',
    'admin@email.com',
    'Admnistrador'
  );
SELECT *
FROM tbControleChave
  JOIN tbSala ON tbSala.salaId = tbControleChave.salaId
  JOIN tbFuncionario ON tbFuncionario.funcId = tbControleChave.funcId;
-- Deletar todos os registros da tabela de Controle de Chave
DELETE FROM tbControleChave;
select *
from tbFuncionario;