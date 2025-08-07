import { ChevronRightIcon, DeleteIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetails(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              className={`bg-slate-400 text-white p-2 mb-2 rounded-md w-full text-left ${
                task.isCompleted && "line-through"
              }`}
              onClick={() => onTaskClick(task.id)}
            >
              {task.title}
              {task.isCompleted ? "Completo" : "Incompleto"}
            </button>
            <Button onClick={() => onSeeDetails(task)}>
              <ChevronRightIcon />
            </Button>
            <Button onClick={() => onDeleteTaskClick(task.id)}>
              <DeleteIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
