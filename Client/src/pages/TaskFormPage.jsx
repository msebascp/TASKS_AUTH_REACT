import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    };
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    };
    if (params.id) {
      updateTask(params.id, dateValid);
    } else {
      createTask(dateValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="h-[calc(100vh-70px)] flex items-center">
      <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto flex flex-col gap-y-3 h-fit">
        <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
          <label htmlFor="title">
            Título
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              autoComplete="title"
              autoFocus
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            />
          </label>
          <label htmlFor="description">
            Descripción
            <textarea
              rows="3"
              id="description"
              {...register("description", { required: true })}
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            ></textarea>
          </label>
          <label htmlFor="date">
            Fecha
            <input
              type="date"
              id="date"
              {...register("date")}
              autoComplete="date"
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            />
          </label>
          <button
            type="submit"
            className="bg-indigo-500 w-fit px-3 py-1 rounded-md self-center"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
