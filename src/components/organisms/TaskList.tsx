import React from "react";
import TaskItem from "../molecules/TaskItem";
import { Task } from "../../types/Task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => (
  <div className="space-y-2">
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggle={onToggle} />
    ))}
  </div>
);

export default TaskList;
