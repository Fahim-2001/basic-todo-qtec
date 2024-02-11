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

  
  return (
    <div>
      <select value={filterPriority} onChange={handlePriorityChange}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="false">Incompleted</option>
      </select>
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
                      color:
                        task.priority === "high"
                          ? "red"
                          : task.priority === "medium"
                          ? "orange"
                          : "green",
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
};
