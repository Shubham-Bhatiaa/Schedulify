import React, { useState, useEffect } from "react";
import GridCalendar from "./components/GridCalendar";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });

  // Initialize events from localStorage
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("calendarEvents");
      return savedEvents ? JSON.parse(savedEvents) : {};
    } catch (error) {
      console.error("Error loading events:", error);
      return {};
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEvents, setShowEvents] = useState(false);

  // Save to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    } catch (error) {
      console.error("Error saving events:", error);
    }
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (!selectedDate) {
      alert("Please select a date first by clicking on a day in the calendar.");
      return;
    }
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleSaveEvent = (newEvent) => {
    const dateKey = formatDate(selectedDate);
    setEvents((prev) => {
      const existingEvents = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...existingEvents, { ...newEvent, id: Date.now() }]
      };
    });
    setIsModalOpen(false);
  };

  const handleEditEvent = (index) => {
    const dateKey = formatDate(selectedDate);
    const eventToEdit = events[dateKey][index];
    setEditingEvent({ ...eventToEdit, index });
    setIsModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const dateKey = formatDate(selectedDate);
    setEvents((prev) => {
      const updatedEvents = [...(prev[dateKey] || [])];
      updatedEvents[editingEvent.index] = {
        ...updatedEvent,
        id: editingEvent.id
      };
      return { ...prev, [dateKey]: updatedEvents };
    });
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (index) => {
    const dateKey = formatDate(selectedDate);
    setEvents((prev) => {
      const updatedEvents = [...(prev[dateKey] || [])];
      updatedEvents.splice(index, 1);
      const newEvents = { ...prev };
      if (updatedEvents.length === 0) {
        delete newEvents[dateKey];
      } else {
        newEvents[dateKey] = updatedEvents;
      }
      return newEvents;
    });
  };

  const getMonthName = (month) => {
    return new Date(0, month).toLocaleString("default", { month: "long" });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => ({
      year: prev.month === 11 ? prev.year + 1 : prev.year,
      month: (prev.month + 1) % 12
    }));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => ({
      year: prev.month === 0 ? prev.year - 1 : prev.year,
      month: (prev.month - 1 + 12) % 12
    }));
  };

  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 flex">
        <div className="flex-grow">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              Schedulify📅
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePreviousMonth}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Previous
              </button>
              <h2 className="text-xl font-semibold text-gray-700">
                {getMonthName(currentMonth.month)} {currentMonth.year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Next
              </button>
            </div>
          </header>

          <GridCalendar
            year={currentMonth.year}
            month={currentMonth.month}
            onDayClick={handleDayClick}
            events={events}
            selectedDate={selectedDate}
          />

          <div className="mt-6 flex justify-between items-center px-4">
            <div className="text-sm text-gray-600">
              {selectedDate
                ? `Selected: ${selectedDate.toLocaleDateString()}`
                : "Click a date to select it"}
            </div>
            <div className="flex gap-5">
              <button
                onClick={handleAddEvent}
                className={`px-6 py-2 rounded transition-colors ${
                  selectedDate
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                disabled={!selectedDate}
              >
                Add Event
              </button>
              <button
                onClick={toggleShowEvents}
                className={`px-6 py-2 rounded transition-colors ${
                  selectedDate
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                disabled={!selectedDate}
              >
                {showEvents ? "Hide Events" : "Show Events"}
              </button>
            </div>
          </div>
        </div>

        {showEvents && selectedDate && (
          <EventList
            date={selectedDate}
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>

      {isModalOpen && (
        <EventModal
          initialEvent={editingEvent}
          onSave={editingEvent ? handleUpdateEvent : handleSaveEvent}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
