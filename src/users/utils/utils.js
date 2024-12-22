export const formatDate = (dateString) => {
    const [ month, day, year] = dateString.split("/"); // Dividir por "/"

    return `${year}-${month}-${day}`; // Reordenar en formato "aaaa-mm-dd"
  };