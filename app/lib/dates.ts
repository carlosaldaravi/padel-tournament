export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  return formattedDate;
};

export const getDateStringFromTimestamp = (fecha: Date) => {
  const año = fecha.getFullYear();
  const mes = `0${fecha.getMonth() + 1}`.slice(-2); // Sumar 1 porque los meses van de 0 a 11
  const dia = `0${fecha.getDate()}`.slice(-2);

  // Formatear la fecha para el input type date
  const fechaFormateada = `${año}-${mes}-${dia}`;
  return fechaFormateada;
};

export const getTimeStringFromTimestamp = (fecha: Date) => {
  const horas = `0${fecha.getHours()}`.slice(-2);
  const minutos = `0${fecha.getMinutes()}`.slice(-2);

  // Formatear la hora para el input type time
  const horaFormateada = `${horas}:${minutos}`;
  return horaFormateada;
};
