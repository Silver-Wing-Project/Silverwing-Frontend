// Convert Date objects or ISO strings to 'YYYY-MM-DD' strings
export const formatDateToString = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toISOString().slice(0, 10);
  }
  // If it's a Date object, format it
  return date.toISOString().slice(0, 10);
};