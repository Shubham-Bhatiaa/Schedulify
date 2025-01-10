// Get all days in the specified month
export const getDaysInMonth = (year, month) => { 
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

// Get the current year and month
export const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
};

// Format date to YYYY-MM-DD
export const formatDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

// Get the name of a month (e.g., January, February)
export const getMonthName = (month) => {
  return new Date(0, month).toLocaleString("default", { month: "long" });
};
