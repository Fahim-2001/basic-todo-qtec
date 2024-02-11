import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setTaskInput } from "../redux/slices/taskSlice";
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
    <div>
      <div className="lg:flex lg:flex-row lg:justify-between items-center">
        <div className="mb-3">
          <label>Task: </label>
          <input
            type="text"
            value={taskInput}
            onChange={handleChange}
            placeholder="Enter task"
            className="px-5 my-3 mr-1 rounded text-black"
          />
        </div>
        <div className="text-black mb-3">
          <label>Set Priority: </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-[3px] rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="text-black mb-3">
          <label>Set Time Frame: </label>
          <input
            type="time"
            value={startTimeInput}
            onChange={handleStartTimeChange}
            className="text-sm lg:text-lg rounded px-1 lg:px-3"
          />
          <span className="mx-4">to</span>
          <input
            type="time"
            value={endTimeInput}
            onChange={handleEndTimeChange}
            className="text-sm lg:text-lg rounded px-1 lg:px-3"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={addTask}
            className="flex items-center gap-3 bg-white px-5 rounded-md"
          >
            <span className="text-black font-medium">Add Task</span>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="1.5"
                ></circle>{" "}
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
