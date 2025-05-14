
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskContext } from "@/context/TaskContext";
import { Plus } from "lucide-react";

interface TaskFormProps {
  id?: string;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  initialTitle = "",
  initialDescription = "",
  isEditing = false,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const { addTask, editTask } = useTaskContext();

  // Update form when props change (for editing)
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEditing && id) {
      editTask(id, title, description);
      if (onCancel) onCancel();
    } else {
      addTask(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          required
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none"
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-todo-purple hover:bg-todo-dark-purple">
          {isEditing ? "Update Task" : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </>
          )}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
