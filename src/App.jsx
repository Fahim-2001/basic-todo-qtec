import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleFilterPriorityChange = (e) => {
    setFilterPriority(e.target.value);
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(task => task.completed).length;

  const filteredTasks = tasks.filter(task => filterPriority === 'all' || task.priority === filterPriority);

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
      <div>
        <label htmlFor="filterPriority">Filter by Priority:</label>
        <select id="filterPriority" value={filterPriority} onChange={handleFilterPriorityChange}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>
      <ul>
        {filteredTasks.map((task) => (
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
