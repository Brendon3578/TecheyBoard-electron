const Toastify = require('toastify-js')

const inputRM = document.querySelector('input#login-rm');
const usernameText = document.getElementById('username');

const users = [
  {RM: '13231', user: 'Brendon Gomes'},
  {RM: '12345', user: 'Felipe Junqueira'},
  {RM: '12361', user: 'Kayo Vinicius'}
]

const fetchUsername = () => {
  let userRM = inputRM.value;

  if (userRM.length == 5) {
    
      let databaseUsername = users.find(user => user.RM === userRM);
    
      if (databaseUsername) {
        usernameText.innerText = databaseUsername.user
        usernameText.classList.add('activeAnimation')
      } else {
        console.log("Não encontrado!");
        setTimeout(() => {
          Toastify({
            text: "Usuário não encontrado no Sistema!\n\nPor favor faça um cadastro com a secretaria!",
            duration: 8000,
            style: {
              background: "linear-gradient(to right, #6b21a8, #7e22ce)",
            }
          }).showToast();
        }, 1000)
      }

  }
}