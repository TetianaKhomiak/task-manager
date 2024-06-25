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
    "#675180": "#F0ECF3",
    "#72c7f8": "#ECF7FE",
    "#cdc5c5": "#FFFFFF",
    "#32B67A": "#F3FCF8",
    "#EAF68E": "#F4F4E1",
  };

  return colorMapping[selectedColor];
};
