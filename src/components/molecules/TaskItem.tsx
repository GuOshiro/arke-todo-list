import React from "react";
import Checkbox from "../atoms/Checkbox";
import { Task } from "../../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => (
  <div className="flex items-center space-x-2">
    <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
    <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>
      {task.name}
    </span>
  </div>
);

export default TaskItem;
