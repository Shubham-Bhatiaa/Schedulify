import React from "react";

const GridCalendar = ({ year, month, onDayClick, events, selectedDate }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const grid = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    grid.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(new Date(year, month, day));
  }

  const isToday = (date) => {
    const today = new Date();
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    return (
      date &&
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2 sm:grid-cols-7">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className={`text-center font-semibold py-2 ${
            day === "Sun" || day === "Sat" ? "text-red-500" : "text-gray-900"
          }`}
        >
          {day}
        </div>
      ))}

      {grid.map((date, index) => {
        const dateKey = date ? formatDate(date) : null;
        const hasEvents = dateKey && events[dateKey]?.length > 0;

        return (
          <div
            key={index}
            onClick={() => date && onDayClick(date)}
            className={`p-4 relative rounded-lg transition-all duration-200
              ${!date ? "bg-gray-50" : "cursor-pointer hover:bg-gray-100"}
              ${isToday(date) ? "bg-blue-200" : "bg-white"}
              ${isSelected(date) ? "ring-2 ring-blue-500 shadow-lg" : ""}
              ${hasEvents ? "hover:transform hover:scale-105" : ""}
            `}
          >
            {date && (
              <>
                <div className="text-center text-gray-700 font-semibold">
                  {date.getDate()}
                </div>
                {hasEvents && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {events[dateKey].length}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GridCalendar;
