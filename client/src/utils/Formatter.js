export const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }
  return parsedDate.toISOString().split("T")[0];
};
