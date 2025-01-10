import React from "react";

const EventList = ({ date, events, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const dateKey = formatDate(date);
  const dayEvents = events[dateKey] || [];

  return (
    <div className="mt-6 bg-white shadow-lg p-4 rounded-lg w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">
        Events on {date.toLocaleDateString()}
      </h3>
      {dayEvents.length === 0 ? (
        <p className="text-gray-500">No events for this day.</p>
      ) : (
        <ul className="space-y-3">
          {dayEvents.map((event, index) => (
            <li
              key={event.id || index}
              className="border-b last:border-b-0 py-3 flex justify-between items-center"
            >
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-800">{event.name}</h4>
                {event.description && (
                  <p className="text-sm text-gray-600">{event.description}</p>
                )}
                <p className="text-xs text-gray-500">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(index)}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
