/**
 * Formatar a data inserida utilizando um tipo de formatação de data válido.
 *
 * @param {Date} date A data que será formatada.
 *
 * @param {'YYYY/MM/DD' | 'HH:MM' | 'DD/MM/YYYY -long'} formatType O tipo de formatação de data válido.
 *
 * As formatações possíveis:
 * - YYYY/MM/DD": 2022/09/24,
 * - "HH:MM": 07:23,
 * - "DD/MM/YYYY -long": 30 de ago. de 2022,
 *
 * @author Brendon Gomes
 */
const formatDate = (date, formatType) => {
  switch (formatType) {
    case "YYYY/MM/DD":
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    case "HH:MM":
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      return `${hour}:${minute}`;
    case "DD/MM/YYYY -long":
      return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    default:
      throw "Erro, insira um tipo de formatação de data válido";
  }
};

export { formatDate };
