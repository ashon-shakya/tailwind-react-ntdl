import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const MAX_ALLOWED_HR = 168;

const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);
  const [firstPass, setFirstPass] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [taskHours, setTaskHours] = useState({
    total: 0,
    good: 0,
    bad: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskList")) || [];
    if (saved) {
      setTaskList(saved);
    }

    setFirstPass(false);
  }, []);

  useEffect(() => {
    if (!firstPass) {
      localStorage.setItem("taskList", JSON.stringify(taskList));

      // update hours
      setTaskHours({
        total: calculateTotalHr().toFixed(1),
        good: calculateGoodHr().toFixed(1),
        bad: calculateBadHr().toFixed(1),
      });
    }
  }, [taskList]);

  // for setting dark theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Calculate total hour
  const calculateTotalHr = () => {
    return taskList.reduce((acc, t) => acc + t.hour, 0);
  };

  // Calculate bad hour
  const calculateBadHr = () => {
    return taskList
      .filter((t) => t.type === "bad")
      .reduce((acc, t) => acc + t.hour, 0);
  };

  // Calculate Good hour
  const calculateGoodHr = () => {
    return taskList
      .filter((t) => t.type === "good")
      .reduce((acc, t) => acc + t.hour, 0);
  };

  // Add Task
  const handleAddTask = (taskObj) => {
    const newHour = parseFloat(taskObj.hour);

    if (!taskObj.task.trim()) {
      return alert("Task is required");
    }

    if (isNaN(newHour) || newHour <= 0) {
      return alert("Hours must be positive");
    }

    if (calculateTotalHr() + newHour > MAX_ALLOWED_HR) {
      return alert("Exceeded max 168 hrs/week");
    }

    const newTask = {
      task: taskObj.task.trim(),
      hour: newHour,
      type: taskObj.type,
      id: uuidv4(),
    };

    setTaskList((prev) => [...prev, newTask]);
  };

  // Delete Task
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      setTaskList(taskList.filter((t) => t.id !== id));
    }
  };

  // Swap Task
  const handleSwap = (id) => {
    setTaskList(
      taskList.map((t) =>
        t.id === id ? { ...t, type: t.type === "good" ? "bad" : "good" } : t
      )
    );
  };

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-12">Not To Do List</h1>

        {/* toggle button */}
        <div className="flex justify-end items-center mb-4">
          <label
            htmlFor="darkModeToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              {/* Hidden checkbox */}
              <input
                type="checkbox"
                id="darkModeToggle"
                className="sr-only" // sr-only makes it visually hidden but accessible
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              {/* Track */}
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              {/* Knob */}
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform dark:translate-x-full dark:bg-gray-300"></div>
            </div>
            <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
              {isDarkMode ? "Dark" : "Light"} Mode
            </div>
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl mb-10">
          {/* Task Form */}
          <TaskForm handleAddTask={handleAddTask} />
        </div>

        {/* Task */}
        <div className="flex flex-col md:flex-row gap-6">
          <TaskList
            taskList={taskList.filter((t) => t.type == "good")}
            type={"good"}
            title={"Productive List"}
            handleDelete={handleDelete}
            handleSwap={handleSwap}
            hour={taskHours.good}
          />
          <TaskList
            taskList={taskList.filter((t) => t.type == "bad")}
            type={"bad"}
            title={"Unproductive List"}
            handleDelete={handleDelete}
            handleSwap={handleSwap}
            hour={taskHours.bad}
          />
        </div>

        <div className="mt-10 bg-amber-500 border border-amber-500 p-4 rounded text-amber-900 text-center">
          <strong>Total Time:</strong> {taskHours.total} hrs / {MAX_ALLOWED_HR}{" "}
          hrs
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
