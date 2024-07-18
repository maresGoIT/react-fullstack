// TaskProvider.js
import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a context
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  // Step 2: Set up state for tasks
  const [tasks, setTasks] = useState([]);

  // Step 3: Define functions to manipulate tasks
  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const deleteTask = (taskId) => setTasks(tasks.filter((task) => task.id !== taskId));
  const toggleTaskCompletion = (taskId) =>
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));

  // Step 4: Provide the context and functions to the components
  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskCompletion }}>
      {children}
      <Element1>
        <Element2>
          <Element3></Element3>
        </Element2>
      </Element1>
    </TaskContext.Provider>
  );
};

// Step 5: Create a custom hook for accessing the context
const useTaskContext = () => useContext(TaskContext);

export { TaskProvider, useTaskContext };