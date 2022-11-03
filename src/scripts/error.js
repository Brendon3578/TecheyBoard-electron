const errorStyles = [
  "color: #FF8080",
  "background-color: #290000",
  "padding: 2px 1rem",
  "padding-right: 2rem",
  "border-radius: 4px",
].join(";");

/**
 * Exibir mensagem de erro no console
 * @param {string} message
 */
function showErrorMessageOnConsole(message) {
  console.log(`%c${message}`, errorStyles);
}

export { showErrorMessageOnConsole };
