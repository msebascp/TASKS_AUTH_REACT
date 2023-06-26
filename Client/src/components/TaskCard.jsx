/* eslint-disable react/prop-types */
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-[80%] w-full p-10 rounded-md flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="self-center">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Link
            to={`/tasks/${task._id}`}
            className=" bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Edit
          </Link>
          <button
            className=" bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
