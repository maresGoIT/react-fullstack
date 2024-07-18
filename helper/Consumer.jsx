// TaskList.js
import React from 'react';
import { useTaskContext } from './TaskProvider';

const TaskList = () => {
  // Step 6: Use the custom hook to access the context
  const { tasks, deleteTask, toggleTaskCompletion } = useTaskContext();

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}{' '}
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Unmark' : 'Mark'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;