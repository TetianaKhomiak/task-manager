export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getMinDate = () => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate());
  return minDate.toISOString().split("T")[0];
};
