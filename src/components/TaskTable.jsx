import React from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import { IoTrashBin } from "react-icons/io5";

const TaskTable = ({ taskList, type, handleSwap, handleDelete }) => {
  return (
    <table className="w-full text-left">
      <tbody>
        {taskList.length ? (
          taskList.map((t, i) => (
            <tr
              key={t.id}
              className="border-b border-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 hover:dark:bg-gray-700 transition"
            >
              <td className="p-3 text-sm ">{i + 1}</td>
              <td className="p-3 text-sm ">{t.task}</td>
              <td className="p-3 text-sm ">{t.hour.toFixed(1)} Hr</td>
              <td className="p-3 text-right space-x-2">
                {type == "good" ? (
                  <>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-md"
                      onClick={() => handleDelete(t.id)}
                    >
                      <IoTrashBin />
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-md"
                      onClick={() => handleSwap(t.id)}
                    >
                      <IoIosArrowDroprightCircle />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-md"
                      onClick={() => handleSwap(t.id)}
                    >
                      <IoIosArrowDropleftCircle />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-md"
                      onClick={() => handleDelete(t.id)}
                    >
                      <IoTrashBin />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-4 text-center text-gray-500">
              No {type} tasks yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TaskTable;
