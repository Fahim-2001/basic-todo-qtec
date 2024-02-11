import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  setEditingTaskId,
  setEditInput,
} from "../redux/slices/taskSlice";
import { setFilterPriority } from "../redux/slices/filterSlice";
import { getEndTimeInMilliSeconds } from "../utility/getEndTimeInMilliSeconds";

export const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((state) => state.tasks.tasks);
  const editingTaskId = useSelector((state) => state.tasks.editingTaskId);
  const editInput = useSelector((state) => state.tasks.editInput);
  const filterPriority = useSelector((state) => state.filter.filterPriority);
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

  const handlePriorityChange = (e) => {
    dispatch(setFilterPriority(e.target.value));
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

  const totalTask = tasks.length;
  const completedTask = tasks.filter((task) => task.completed === true).length;

  return (
    <div>
      <div className="text-black flex justify-between my-5">
        <select
          value={filterPriority}
          className="px-3 rounded"
          onChange={handlePriorityChange}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-10">
          <div className="flex items-center gap-3" title="Total Task">
            {totalTask}
            <svg
              fill="#ffff"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              width="25px"
              height="20px"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M369.44,0H141.889C97.971,0,62.578,36.182,62.578,80.108v352.675c0,43.927,35.393,79.217,79.311,79.217H369.44 c43.917,0,79.982-35.29,79.982-79.217V80.108C449.422,36.182,413.357,0,369.44,0z M426.667,432.783 c0,31.379-25.857,56.461-57.227,56.461H141.889c-31.371,0-56.556-25.082-56.556-56.461V80.108 c0-31.379,25.185-57.353,56.556-57.353H369.44c31.37,0,57.227,25.973,57.227,57.353V432.783z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <rect
                      x="153.6"
                      y="56.889"
                      width="204.8"
                      height="22.756"
                    ></rect>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M153.6,170.667h-11.378c-6.283,0-11.378,5.094-11.378,11.378V204.8c0,6.283,5.094,11.378,11.378,11.378H153.6 c6.283,0,11.378-5.094,11.378-11.378v-22.756C164.978,175.761,159.883,170.667,153.6,170.667z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M153.6,273.067h-11.378c-6.283,0-11.378,5.094-11.378,11.378V307.2c0,6.283,5.094,11.378,11.378,11.378H153.6 c6.283,0,11.378-5.094,11.378-11.378v-22.756C164.978,278.161,159.883,273.067,153.6,273.067z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M153.6,375.467h-11.378c-6.283,0-11.378,5.094-11.378,11.378V409.6c0,6.283,5.094,11.378,11.378,11.378H153.6 c6.283,0,11.378-5.094,11.378-11.378v-22.756C164.978,380.561,159.883,375.467,153.6,375.467z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <rect
                      x="199.111"
                      y="182.044"
                      width="182.044"
                      height="22.756"
                    ></rect>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <rect
                      x="199.111"
                      y="284.444"
                      width="182.044"
                      height="22.756"
                    ></rect>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <rect
                      x="199.111"
                      y="386.844"
                      width="182.044"
                      height="22.756"
                    ></rect>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className="flex items-center gap-3" title="Completed Task">
            {completedTask}
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              fill="#33d17a"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z"
                  fill=""
                ></path>
                <path
                  d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z"
                  fill=""
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead className="">
          <tr className="text-lg lg:text-xl font-semibold">
            <th>Task</th>
            <th>Time Frame</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter(
              (task) =>
                filterPriority === "all" || task.priority === filterPriority
            )
            .map((task) => (
              <tr key={task.id} className="text-sm lg:text-lg text-center">
                <td className="flex gap-5">
                  <button onClick={() => toggleTaskCompletion(task.id)}>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultChecked={task.completed ? true : false}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />
                  </button>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      className="text-black"
                      value={editInput}
                      onChange={handleEditInputChange}
                      onBlur={() => finishEditingTask(task.id)}
                      autoFocus
                    />
                  ) : (
                    <p
                      onClick={() => startEditingTask(task.id, task.text)}
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color:
                          task.priority === "high"
                            ? "#ED2939"
                            : task.priority === "medium"
                            ? "yellow"
                            : "#33d17a",
                      }}
                    >
                      {task.text}
                      {task.endTime &&
                      Date.now() > getEndTimeInMilliSeconds(task.endTime) &&
                      !task.completed ? (
                        <span className="hidden lg:inline-block bg-white text-red-700 text-xs font-semibold rounded px-3 ml-3">
                          Time Expired
                        </span>
                      ) : null}
                    </p>
                  )}
                </td>
                <td className="mx-10">
                  {task.startTime ? (
                    <span>{task.startTime}</span>
                  ) : (
                    <span>Not Set</span>
                  )}
                  {task.endTime ? (
                    <span> -{task.endTime}</span>
                  ) : (
                    <span> -Not Set</span>
                  )}
                </td>
                <td>{task.completed ? "Completed" : "Incompleted"}</td>
                <td>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-white rounded-[50%] p-1"
                  >
                    <svg
                      width="20px"
                      height="20px"
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
                        <path
                          d="M10 11V17"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M14 11V17"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M4 7H20"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ul></ul>
    </div>
  );
};
