import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  setTaskInput,
  setEditingTaskId,
  setEditInput,
} from "./redux/slices/taskSlice";
import { setFilterPriority } from "./redux/slices/filterSlice";
import { setStartTimeInput, setEndTimeInput } from "./redux/slices/timeSlice";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskInput = useSelector((state) => state.tasks.taskInput);
  const editingTaskId = useSelector((state) => state.tasks.editingTaskId);
  const editInput = useSelector((state) => state.tasks.editInput);
  const filterPriority = useSelector((state) => state.filter.filterPriority);
  const startTimeInput = useSelector((state) => state.time.startTimeInput);
  const endTimeInput = useSelector((state) => state.time.endTimeInput);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch(setTasks(JSON.parse(storedTasks)));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const handleChange = (e) => {
    dispatch(setTaskInput(e.target.value));
  };

  const handlePriorityChange = (e) => {
    dispatch(setFilterPriority(e.target.value));
  };

  const handleStartTimeChange = (e) => {
    dispatch(setStartTimeInput(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    dispatch(setEndTimeInput(e.target.value));
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        priority: "low",
        completed: false,
        startTime: startTimeInput,
        endTime: endTimeInput,
      };
      dispatch(setTasks([...tasks, newTask]));
      dispatch(setTaskInput(""));
      dispatch(setStartTimeInput(""));
      dispatch(setEndTimeInput(""));
    }
  };

  const deleteTask = (id) => {
    dispatch(setTasks(tasks.filter((task) => task.id !== id)));
  };

  const toggleTaskCompletion = (id) => {
    dispatch(
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  const handleEditInputChange = (e) => {
    dispatch(setEditInput(e.target.value));
  };

  const startEditingTask = (id, text) => {
    dispatch(setEditingTaskId(id));
    dispatch(setEditInput(text));
  };

  const finishEditingTask = (id) => {
    dispatch(
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editInput } : task
        )
      )
    );
    dispatch(setEditingTaskId(null));
  };

  const getEndTimeInMilliSeconds = (endTime) => {
    const timeParts = endTime.split(":");
    const dateObj = new Date();
    dateObj.setHours(parseInt(timeParts[0], 10));
    dateObj.setMinutes(parseInt(timeParts[1], 10));
    const timeInMilliseconds = dateObj.getTime();
    return timeInMilliseconds;
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
        <select value={filterPriority} onChange={handlePriorityChange}>
          <option value="all">All</option>
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
      <ul>
        {tasks
          .filter(
            (task) =>
              filterPriority === "all" || task.priority === filterPriority
          )
          .map((task) => (
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
                    }}
                  >
                    {task.text}
                  </span>
                )}
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
  );
}

export default App;
