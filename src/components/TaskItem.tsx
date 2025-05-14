
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Edit, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleComplete, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  if (isEditing) {
    return (
      <Card className="task-item overflow-hidden shadow-md hover:shadow-lg bg-todo-light-purple/30">
        <CardContent className="pt-6">
          <TaskForm
            id={task.id}
            initialTitle={task.title}
            initialDescription={task.description}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "task-item overflow-hidden shadow-md hover:shadow-lg transition-all duration-200",
      task.completed ? "bg-todo-green/40" : "bg-white"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleComplete(task.id)}
            className="mt-0.5 border-2 border-todo-purple data-[state=checked]:bg-todo-purple data-[state=checked]:text-primary-foreground"
          />
          <div className="flex-1">
            <h3 className={cn(
              "text-lg font-medium transition-all duration-200",
              task.completed && "task-complete"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                task.completed && "task-complete"
              )}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {formatDate(task.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-2 gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="text-muted-foreground hover:text-foreground hover:bg-todo-light-purple/50"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTask(task.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
