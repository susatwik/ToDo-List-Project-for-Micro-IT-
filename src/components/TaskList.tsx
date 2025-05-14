
import React from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { filteredTasks, filter } = useTaskContext();

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
        <div className="mb-4 text-6xl">✓</div>
        <h3 className="text-xl font-medium text-muted-foreground">
          {filter === "all" 
            ? "No tasks yet" 
            : filter === "active" 
              ? "No active tasks" 
              : "No completed tasks"}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          {filter === "all" 
            ? "Add your first task to get started" 
            : filter === "active" 
              ? "All tasks are completed. Great job!" 
              : "Complete some tasks to see them here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
