import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        priority: priority,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditInput(text);
  };

  const finishEditingTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editInput } : task
      )
    );
    setEditingTaskId(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={handleChange}
          placeholder="Enter task"
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color:
                task.priority === 'high'
                  ? 'red'
                  : task.priority === 'medium'
                  ? 'orange'
                  : 'green',
            }}
          >
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editInput}
                onChange={handleEditInputChange}
                onBlur={() => finishEditingTask(task.id)}
                autoFocus
              />
            ) : (
              <span onClick={() => startEditingTask(task.id, task.text)}>
                {task.text}
              </span>
            )}
            {" - "}Status: {task.completed ? 'Completed' : 'Not Completed'}
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
