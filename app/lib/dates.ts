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

  const dateFormatted = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  return dateFormatted;
};

export const getDateStringFromTimestamp = (fecha: Date | undefined) => {
  if (!fecha) {
    return "";
  }
  const year = fecha.getFullYear();
  const month = `0${fecha.getMonth() + 1}`.slice(-2);
  const dia = `0${fecha.getDate()}`.slice(-2);

  // Format date for input type date
  const dateFormatted = `${year}-${month}-${dia}`;
  return dateFormatted;
};

export const getTimeStringFromTimestamp = (fecha: Date | undefined) => {
  if (!fecha) {
    return "";
  }
  const hours = `0${fecha.getHours()}`.slice(-2);
  const minutes = `0${fecha.getMinutes()}`.slice(-2);

  // Format time for input type time
  const hourFormatted = `${hours}:${minutes}`;
  return hourFormatted;
};
