
import React from "react";
import { TaskProvider } from "@/context/TaskContext";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilter from "@/components/TaskFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckSquare } from "lucide-react";

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-todo-light-purple/30 to-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-todo-purple" />
                <CardTitle className="text-2xl font-bold text-todo-purple">To-Do List</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Organize your tasks and boost your productivity
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="bg-todo-light-purple/40 border-none">
                <CardContent className="pt-6">
                  <TaskForm />
                </CardContent>
              </Card>
              
              <Separator />
              
              <div>
                <TaskFilter />
                <TaskList />
              </div>
            </CardContent>
          </Card>
          
          <footer className="text-center text-xs text-muted-foreground mt-8">
            © {new Date().getFullYear()} To-Do List App
          </footer>
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
