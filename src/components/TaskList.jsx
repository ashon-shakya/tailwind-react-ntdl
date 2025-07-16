import React from "react";
import TaskTable from "./TaskTable";

const TaskList = ({
  taskList,
  type,
  handleDelete,
  handleSwap,
  hour,
  title,
}) => {
  return (
    <>
      <h2 className="text-white text-xl font-semibold text-center mb-4 uppercase">
        {title ?? type + " List"}
      </h2>
      <hr className="border-gray-700" />
      <TaskTable
        taskList={taskList}
        type={type}
        handleDelete={handleDelete}
        handleSwap={handleSwap}
      />

      {type == "good" ? (
        <div className="mt-6 bg-green-900 border border-green-700 p-4 rounded text-green-200">
          <strong>Productive Time:</strong> {hour} hrs
        </div>
      ) : (
        <div className="mt-6 bg-red-900 border border-red-700 p-4 rounded text-red-200">
          <strong>Wasted Time:</strong> {hour} hrs
        </div>
      )}
    </>
  );
};

export default TaskList;
