export const getInitials = (firstName = '', lastName = '') => {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
};

export const formatDate = (utcDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const isValidDate = typeof utcDate === 'string' && utcDate.includes('T') && utcDate.includes(':');

  let localDateString = '';

  if (isValidDate) {
    // Convert the UTC date string to a Date object
    const date = new Date(utcDate);
    
    // Format the date to the user's local time
    localDateString = date.toLocaleString(undefined, options); // Customize if needed
  } else {
    localDateString = utcDate;
  }
  return localDateString;


};
