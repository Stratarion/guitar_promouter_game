export const mlsecondsToHours = (mlsecons) => mlsecons / 1000 / 60 / 60;

export const showDateAsString = (date) => {
  if (!date) return '0 секунд';
  const dateInseconds = Math.trunc(date?.toString() / 1000);
  const seconds = dateInseconds % 60;
  const dateInminuts = Math.trunc(dateInseconds / 60);
  if (dateInminuts === 0) return `${seconds} секунд`;
  const minuts = dateInminuts % 60;
  const dateInHours = Math.trunc(dateInminuts / 24);
  if (dateInHours === 0) return `${minuts} минут ${seconds} секунд`;
  const hours = dateInHours % 60;
  const dateIndays = Math.trunc(dateInHours / 24);
  if (dateIndays === 0) return `${hours} часов ${minuts} минут ${seconds} секунд`;
  const days = dateIndays % 60;
  // const dateInMonth = Math.trunc(dateIndays / 30);
  return `${days} дней ${hours} часов ${minuts} минут ${seconds} секунд`;
};
