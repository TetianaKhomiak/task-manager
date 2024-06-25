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

export const transformColor = (selectedColor) => {
  const colorMapping = {
    "#87B69D": "#EAF5EC",
    "#ab91c7": "#f0e9f8",
    "#72c7f8": "#eff6fa",
    "#cdc5c5": "#F5F6F8",
    "#f8a9b2": "#fbeeef",
    "#EAF68E": "#F4F4E1",
  };

  return colorMapping[selectedColor];
};
