import React, { useState, useEffect } from "react";

const EventModal = ({ initialEvent, onSave, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (initialEvent) {
      setName(initialEvent.name);
      setDescription(initialEvent.description);
      setStartTime(initialEvent.startTime);
      setEndTime(initialEvent.endTime);
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({ name, description, startTime, endTime });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {initialEvent ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Event Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
