import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleFilterPriorityChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTimeInput(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTimeInput(e.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        priority: priority,
        completed: false,
        startTime: startTimeInput,
        endTime: endTimeInput,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setStartTimeInput("");
      setEndTimeInput("");
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getEndTimeInMilliSeconds = (endTime) => {
    const timeParts = endTime.split(":");
    const dateObj = new Date();
    dateObj.setHours(parseInt(timeParts[0], 10));
    dateObj.setMinutes(parseInt(timeParts[1], 10));
    const timeInMilliseconds = dateObj.getTime();
    return timeInMilliseconds;
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const filteredTasks = tasks.filter(
    (task) => filterPriority === "all" || task.priority === filterPriority
  );

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
        <input
          type="time"
          value={startTimeInput}
          onChange={handleStartTimeChange}
        />
        <input
          type="time"
          value={endTimeInput}
          onChange={handleEndTimeChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <label htmlFor="filterPriority">Filter by Priority:</label>
        <select
          id="filterPriority"
          value={filterPriority}
          onChange={handleFilterPriorityChange}
        >
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
      <div>
        <ul>
          {filteredTasks.map((task, i) => (
            <li key={task.id}>
              <div>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editInput}
                    onChange={handleEditInputChange}
                    onBlur={() => finishEditingTask(task.id)}
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => startEditingTask(task.id, task.text)}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color:
                        task.priority === "high"
                          ? "red"
                          : task.priority === "medium"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {i + 1}-{task.text}
                  </span>
                )}{" "}
                - Status: {task.completed ? "Completed" : "Not Completed"}
                {task.endTime &&
                Date.now() > getEndTimeInMilliSeconds(task.endTime) &&
                !task.completed ? (
                  <span style={{ marginLeft: "5px", color: "red" }}>
                    {" "}
                    - Time Expired
                  </span>
                ) : null}
              </div>
              <div>
                {task.startTime ? (
                  <span>Start Time: {task.startTime}</span>
                ) : (
                  <span>Start Time: Not Set</span>
                )}
                {task.endTime ? (
                  <span> - End Time: {task.endTime}</span>
                ) : (
                  <span> - End Time: Not Set</span>
                )}
              </div>
              <div>
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
