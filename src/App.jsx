import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const MAX_ALLOWED_HR = 168;

const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);

  const [taskHours, setTaskHours] = useState({
    total: 0,
    good: 0,
    bad: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskList")) || [];
    console.log(111, saved);
    if (saved) {
      setTaskList(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));

    // update hours
    setTaskHours({
      total: calculateTotalHr().toFixed(1),
      good: calculateGoodHr().toFixed(1),
      bad: calculateBadHr().toFixed(1),
    });
  }, [taskList]);

  // Calculate total hour
  const calculateTotalHr = () => taskList.reduce((acc, t) => acc + t.hour, 0);

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
    if (confirmDelete) setTaskList(taskList.filter((t) => t.id !== id));
  };

  // Swap Task
  const handleSwap = (id) => {
    setTaskList(
      taskList.map((t) =>
        t.id === id ? { ...t, type: t.type === "good" ? "bad" : "good" } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Not To Do List</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-10">
          {/* Task Form */}
          <TaskForm handleAddTask={handleAddTask} />
        </div>

        {/* Task */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-gray-800 rounded-xl p-5 shadow-md w-full">
            <TaskList
              taskList={taskList.filter((t) => t.type == "good")}
              type={"good"}
              title={"Productive List"}
              handleDelete={handleDelete}
              handleSwap={handleSwap}
              hour={taskHours.good}
            />
          </div>
          <div className="bg-gray-800 rounded-xl p-5 shadow-md w-full">
            <TaskList
              taskList={taskList.filter((t) => t.type == "bad")}
              type={"bad"}
              title={"Unproductive List"}
              handleDelete={handleDelete}
              handleSwap={handleSwap}
              hour={taskHours.bad}
            />
          </div>
        </div>

        <div className="mt-10 bg-amber-900 border border-amber-700 p-4 rounded text-amber-200 text-center">
          <strong>Total Time:</strong> {taskHours.total} hrs / {MAX_ALLOWED_HR}{" "}
          hrs
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
