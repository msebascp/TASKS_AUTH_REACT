import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tasks.length === 0)
    return <h1 className="text-center py-10">No tasks</h1>;

  return (
    <div className="grid grid-cols-1 gap-2 justify-items-center py-10">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
