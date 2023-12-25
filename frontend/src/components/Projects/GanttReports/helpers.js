import { Task } from "gantt-task-react";

export const initTasks = () => {
  const currentDate = new Date();
  const tasks = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Sample Data",
      id: "ProjectSample",
      progress: 25,
      type: "project",

      hideChildren: false
    },
    
  ];
  return tasks;
};

