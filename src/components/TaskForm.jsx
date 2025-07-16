import React, { useState } from "react";

const TaskForm = ({ handleAddTask }) => {
  const [task, setTask] = useState("");
  const [hour, setHour] = useState("");
  const [type, setType] = useState("good");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Enter task"
        className="flex-1 p-3 rounded bg-gray-700 border border-gray-600 text-white"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="number"
        placeholder="Hours"
        className="w-24 p-3 rounded bg-gray-700 border border-gray-600 text-white"
        value={hour}
        onChange={(e) => setHour(e.target.value)}
      />
      <select
        className="w-36 p-3 rounded bg-gray-700 border border-gray-600 text-white"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="good">Good Task</option>
        <option value="bad">Bad Task</option>
      </select>
      <button
        onClick={() => handleAddTask({ task, type, hour })}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white rounded shadow"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
