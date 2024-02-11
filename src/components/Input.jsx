import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  setTaskInput,
} from "../redux/slices/taskSlice";
import { setStartTimeInput, setEndTimeInput } from "../redux/slices/timeSlice";

export const Input = () => {
  const [priority, setPriority] = useState("low");
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskInput = useSelector((state) => state.tasks.taskInput);
  
  const startTimeInput = useSelector((state) => state.time.startTimeInput);
  const endTimeInput = useSelector((state) => state.time.endTimeInput);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    dispatch(setTaskInput(e.target.value));
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
        priority: priority,
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

  return (
    <div><div>
    <input
      type="text"
      value={taskInput}
      onChange={handleChange}
      placeholder="Enter task"
    />
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
  </div></div>
  )
}
