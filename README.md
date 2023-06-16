<h1 align="center">
    <img src="./src/assets/system-logo.png" alt="Arduteam" width="250px">
</h1>

<small>Etec de Sapopemba - 3ºC - Desenvolvimento de Sistemas - 2022</small>

# Techeybord

Esse é o repositório dos códigos feitos para o projeto TecheyBord, feito pela equipe **Arduteam**. O projeto consiste em um claviculário robotizado, feito utilizando componentes eletrônicos Arduino, para uma maior organização administrativa de controle de chaves da **Etec de Sapopemba**.

Vale destacar que o projeto, consiste em duas partes: o **Software** (o aplicativo desktop), onde ocorre o de agendamento de salas (que o claviculário libera a chave da respectiva sala) e a organização e controle de chaves (quem agendou a sala e retirou a chave), e o **Hardware**, na qual se consiste a parte física da aplicação do claviculário, feito utilizando a plataforma e componentes eletrônicos do Arduino, no qual  realiza a parte mecânica do projeto.

## 🖼 Imagens das interfaces visuais do software (Telas)

<details>
  <summary>Interface Principal (index)</summary>

  <details>
    <summary>Tela de login</summary>
    <img alt="Tela de login" src="./.github/images/login-01.PNG" width="400px">
  </details>

  <details>
    <summary>Tela de login preenchida pelo administrador</summary>
    <img alt="Tela de login preenchida pelo administrador" src="./.github/images/login-02.PNG" width="400px">
  </details>

  <details>
    <summary>Tela de login preenchida pelo usuário</summary>
    <img alt="Tela de login preenchida pelo usuário" src="./.github/images/login-03.PNG" width="400px">
  </details>

  <details>
    <summary>Tela de erro quando banco de dados não é conectado</summary>
    <img alt="Tela de erro quando banco de dados não é conectado" src="./.github/images/login-04.PNG" width="400px">
  </details>

</details>

<hr>

<details>
  <summary>Interface do usuário</summary>

  <details>
    <summary>Tela de usuário - calendário (dia selecionado)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-01.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - calendário (mês selecionado)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-02.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - calendário (semana selecionado e clicado no agendamento)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-00.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - calendário (semana selecionado e clicado no agendamento com vários agendamentos em um dia)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-03.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - agendar chave</summary>
    <img alt="Tela de usuário" src="./.github/images/user-04.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - agendar chave (selecionado a data)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-06.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - agendar chave (com o checkbox marcado de agendar o uso da chave (sala) em um período de 1 mês)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-05.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - salas agendadas</summary>
    <img alt="Tela de usuário" src="./.github/images/user-07.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - configurações da conta</summary>
    <img alt="Tela de usuário" src="./.github/images/user-08.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de usuário - configurações da conta (modal de alterar a senha)</summary>
    <img alt="Tela de usuário" src="./.github/images/user-09.PNG" width="600px">
  </details>

</details>

<hr>

<details>
  <summary>Interface do administrador</summary>

  <details>
    <summary>Tela de administrador - cadastro de usuários</summary>
    <img alt="Tela de administrador" src="./.github/images/admin-01.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de administrador - cadastro de usuários (editando dados do usuário)</summary>
    <img alt="Tela de administrador" src="./.github/images/admin-03.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de administrador - cadastro de salas (com nenhuma sala cadastrada)</summary>
    <img alt="Tela de administrador" src="./.github/images/admin-02.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de administrador - cadastro de salas (editando informações da sala)</summary>
    <img alt="Tela de administrador" src="./.github/images/admin-04.PNG" width="600px">
  </details>

  <details>
    <summary>Tela de administrador - cadastro de salas (tabela de salas)</summary>
    <img alt="Tela de administrador" src="./.github/images/admin-05.PNG" width="600px">
  </details>

</details>

## 🖼 Imagens da aplicação do hardware

<details>
  <summary>Prótotipos do Arduino feito no Tinkercad</summary>

  <details>
    <summary>Protótipo utilizando 4 servomotores para as chaves</summary>
    <img alt="Protótipo utilizando 4 servomotores" src="./arduino_scripts/prototipo-4-servomotores/arduteam-prototipo-01.png" width="600px">
  </details>

  <details>
    <summary>Exemplo da utilização de 1 servomotor na placa do Arduino UNO</summary>
    <img alt="Protótipo utilizando 4 servomotores" src="./arduino_scripts/servo-motor-example.PNG" width="600px">
  </details>

</details>

<hr>

<details>
  <summary>Protótipos em execução</summary>

  <details>
    <summary>Protótipo com o servo motor liberado</summary>
    <img alt="Protótipo com o servo motor liberado" src="./arduino_scripts/fotos/foto-servomotor-liberado.jpeg" width="600px">
  </details>

  <details>
    <summary>Protótipo com o servo motor preso</summary>
    <img alt="Protótipo com o servo motor preso" src="./arduino_scripts/fotos/foto-servomotor-fechado.jpeg" width="600px">
  </details>
</details>

<hr>

## Outros diretórios da aplicação

- [Diretório das estilizações (CSS e TailwindCSS)](./src/styles/)
- [Diretório dos scripts javascript](./src/scripts/)
- [Diretório de fontes e imagens do sistema](./src/assets/)
- [Diretório de scripts do banco de dados (MySql)](./database_scripts/)
- [Diretório dos códigos do arduino (C++ e C)](./arduino_scripts/)

## Instalação

Para iniciar o sistema é necessário ter instalado em sua máquina:

- [NodeJS](https://nodejs.org/pt-br/)
- [Servidor MySQL do XAMPP](https://www.apachefriends.org/pt_br/index.html)

Após isso, entre com um Prompt de Comando (CMD), dentro da pasta que está instalado o sistema e escreva os seguintes comandos:

```bash
  # O script abaixo vai instalar os pacotes do sistemam
  # Pode demorar por volta de 1 a 5 Minutos
  npm install

  # Irá inicializar o sistema em sua máquina
  npm start
```

É necessário também iniciar o servidor MySQL do XAMPP na porta 3306

## Utilizando o sistema

Depois de seguir os passos de [instalação do software](#instalação) e ter configurado o servidor MySql na porta 3306, para testar as funcionalidades do sistema é necessário seguir os seguintes passos

1. Usar o comando `npm start` para aplicar a aplicação desktop
2. Acessar a página de administrador para criar um cadastro: colocar **admin** no campo da matrícula e **12345** no campo de senha
