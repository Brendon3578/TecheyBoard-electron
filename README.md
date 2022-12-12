<small>Etec de Sapopemba - 3ºC - Desenvolvimento de Sistemas - 2022</small>

<h1 align="center">
    <img src="./src/assets/system-logo.png" alt="Arduteam" width="250px">
</h1>

# Techeyboard

Esse é o **CÓDIGO FONTE** do projeto TecheyBoard feito pela equipe **ARDUTEAM**, o projeto consiste em um claviculário robotizado, feito em Arduino, para uma maior organização administrativa da **Etec de Sapopemba**. Cabe destacar que o projeto, consiste em duas partes: o sistema digital, onde ocorre o agendamento e a organização de chaves, e o sistema físico, na qual se consiste no Arduino, que irá realizar a parte mecânica do projeto. Abaixo estará o Código Fonte do sistema digital


### Código das Interfaces Visuais (Telas)

<details>
  <summary>Telas de Usuário</summary>

  **[Pasta dos Código](./src/pages/user/)**
  - [Calendário](./src/pages/user/calendar/)
  - [Chaves Agendadas](./src/pages/user/keys-scheduled/)
  - [Agendar Chave](./src/pages/user/schedule-key/)
  - [Configurações da Conta](./src/pages/user/user-account/)
</details>

<details>
  <summary>Telas de Administrador</summary>

  **[Pasta dos Código](./src/pages/admin/)**
  - [Painel de Controle](./src/pages/admin/dashboard/)
  - [Calendário de Controle](./src/pages/admin/calendar-control/)
  - [Cadastro de Usuários](./src/pages/admin/users/)
  - [Cadastro de Salas](./src/pages/admin/rooms/)
  - [Configurações da Conta](./src/pages/admin/admin-account/)
</details>

### Código gerais do Sistema

- [Pasta de Estilizações (CSS)](./src/styles/)
- [Pasta de Scripts (Javascript)](./src/scripts/)
- [Pasta de Fontes e Imagens do Sistema](./src/assets/)
- [Pasta de Scripts do Banco de Dados (MySql)](./database_scripts/)
- [Pasta dos Códigos do Arduino](./arduino_scripts/)

### Observações

Para iniciar o sistema é necessário ter instalado em sua máquina:
- [Node.JS](https://nodejs.org/pt-br/)
- [XAMPP](https://www.apachefriends.org/pt_br/index.html)

Após isso, entre com um Prompt de Comando (CMD), dentro da pasta que está instalado o sistema e escreva os seguintes comandos:

```bash
  # O script abaixo vai instalar os pacotes do sistemam
  # Pode demorar por volta de 1 a 5 Minutos
  npm install

  # Irá inicializar o sistema em sua máquina
  npm start
```