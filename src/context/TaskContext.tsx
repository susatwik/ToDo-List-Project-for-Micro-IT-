
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Define Task type
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Define Task Context type
type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, title: string, description: string) => void;
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  filteredTasks: Task[];
};

// Create Task Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Define Action Types
type TaskAction =
  | { type: "ADD_TASK"; title: string; description: string }
  | { type: "DELETE_TASK"; id: string }
  | { type: "TOGGLE_COMPLETE"; id: string }
  | { type: "EDIT_TASK"; id: string; title: string; description: string }
  | { type: "SET_FILTER"; filter: "all" | "active" | "completed" }
  | { type: "INIT_TASKS"; tasks: Task[] };

// Define initial state
const initialState = {
  tasks: [],
  filter: "all",
} as {
  tasks: Task[];
  filter: "all" | "active" | "completed";
};

// Reducer function
const taskReducer = (state: typeof initialState, action: TaskAction) => {
  switch (action.type) {
    case "INIT_TASKS":
      return {
        ...state,
        tasks: action.tasks,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          {
            id: crypto.randomUUID(),
            title: action.title,
            description: action.description,
            completed: false,
            createdAt: new Date(),
          },
          ...state.tasks,
        ],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, title: action.title, description: action.description }
            : task
        ),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

// Create Provider Component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert string dates back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
        dispatch({ type: "INIT_TASKS", tasks: tasksWithDates });
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Function to add a new task
  const addTask = (title: string, description: string) => {
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", title, description });
    toast("Task added", {
      description: "Your new task has been added successfully",
    });
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", id });
    toast("Task deleted", {
      description: "Task has been deleted successfully",
    });
  };

  // Function to toggle task completion
  const toggleComplete = (id: string) => {
    dispatch({ type: "TOGGLE_COMPLETE", id });
  };

  // Function to edit a task
  const editTask = (id: string, title: string, description: string) => {
    if (!title.trim()) return;
    dispatch({ type: "EDIT_TASK", id, title, description });
    toast("Task updated", {
      description: "Your task has been updated successfully",
    });
  };

  // Function to set filter
  const setFilter = (filter: "all" | "active" | "completed") => {
    dispatch({ type: "SET_FILTER", filter });
  };

  // Get filtered tasks
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "all") return true;
    if (state.filter === "active") return !task.completed;
    if (state.filter === "completed") return task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        toggleComplete,
        editTask,
        filter: state.filter,
        setFilter,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Create a hook to use the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
