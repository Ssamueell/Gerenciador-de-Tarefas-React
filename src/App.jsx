import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  let [tasks, setTasks] =
    useState(JSON.parse(localStorage.getItem("tasks"))) || [];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const FetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      // setTasks(data);
    };
    // FetchData();
  });

  function onDeleteTaskClick(taskID) {
    const filteredTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(filteredTasks);
  }

  function onTaskClick(taskID) {
    try {
      const completedTasks = tasks.map((task) =>
        task.id === taskID ? { ...task, isCompleted: !task.isCompleted } : task
      );
      setTasks(completedTasks);
    } catch (error) {
      console.error(new Error(`Something went wrong ${error.message}`));
    }
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen flex justify-center bg-amber-50 p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask tasks={tasks} onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
