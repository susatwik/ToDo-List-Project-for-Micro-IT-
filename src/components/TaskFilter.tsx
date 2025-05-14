
import React from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";

const TaskFilter: React.FC = () => {
  const { filter, setFilter, tasks } = useTaskContext();

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-muted-foreground mr-2">Filter:</span>
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-todo-purple hover:bg-todo-dark-purple" : ""}
        >
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
          className={filter === "active" ? "bg-todo-purple hover:bg-todo-dark-purple" : ""}
        >
          Active ({activeCount})
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "bg-todo-purple hover:bg-todo-dark-purple" : ""}
        >
          Completed ({completedCount})
        </Button>
      </div>
    </div>
  );
};

export default TaskFilter;
