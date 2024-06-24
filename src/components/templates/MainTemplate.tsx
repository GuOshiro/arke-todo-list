import React, { useState, useEffect, useRef } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import TaskList from "../organisms/TaskList";
import { Task } from "../../types/Task";

const MainTemplate: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTaskName) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: newTaskName,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <InputField
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <TaskList tasks={tasks} onToggle={toggleTaskCompletion} />
      <Button onClick={removeCompletedTasks}>Remove Completed Tasks</Button>
    </div>
  );
};

export default MainTemplate;
