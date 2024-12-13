import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // Axios for API calls

const teamMembers = [
  { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "David", avatar: "https://i.pravatar.cc/150?img=4" },
];

function ManageProject() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "Medium",
    assignedTo: [],
    status: "To Do",
  });

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/kanbans");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/kanbans", {
        ...newTask,
        dueDate: newTask.dueDate.toISOString(),
      });
      setTasks([...tasks, response.data.kanban]); // Add the new task to the local state
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks); // Optimistically update the UI

    try {
      await axios.put(`http://localhost:3001/api/kanbans`, {
        id: taskId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-5xl font-extrabold mb-8 text-center text-indigo-700">
        Manage Your Project
      </h2>

      <button
        className="mb-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
        onClick={openModal}
      >
        Add New Task
      </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <KanbanColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === "To Do")}
          updateTaskStatus={updateTaskStatus}
          columnClass="bg-white" // Default column color
        />
        <KanbanColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "In Progress")}
          updateTaskStatus={updateTaskStatus}
          columnClass="bg-blue-100" // Light blue column color
        />
        <KanbanColumn
          title="Completed"
          tasks={tasks.filter((task) => task.status === "Completed")}
          updateTaskStatus={updateTaskStatus}
          columnClass="bg-green-100" // Green background for Completed column
        />
       
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transition-all transform">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Add New Task</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                rows="3"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Due Date</label>
              <DatePicker
                selected={newTask.dueDate}
                onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
                dateFormat="yyyy-MM-dd"
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                placeholderText="Select due date"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Assign to Team Members
              </label>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <label key={member.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight"
                      value={member.id}
                      onChange={(e) => {
                        const selectedMembers = e.target.checked
                          ? [
                              ...newTask.assignedTo,
                              { name: member.name, avatar: member.avatar },
                            ]
                          : newTask.assignedTo.filter(
                              (selected) => selected.name !== member.name
                            );
                        setNewTask({ ...newTask, assignedTo: selectedMembers });
                      }}
                    />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-3 hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({ title, tasks, updateTaskStatus, columnClass }) {
  return (
    <div className={`p-4 rounded-lg shadow-md ${columnClass}`}>
      <h3 className="text-3xl font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="space-y-6">
        {tasks.map((task) => (
          <KanbanCard
            key={task._id}
            task={task}
            updateTaskStatus={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}

function KanbanCard({ task, updateTaskStatus }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all transform hover:shadow-xl hover:scale-105 duration-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800">{task.title}</h4>
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
          className="bg-indigo-100 text-indigo-800 rounded px-3 py-1 text-sm focus:ring-indigo-500"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <p className="text-gray-700 mb-4">{task.description}</p>
      <p className="text-gray-500 text-sm">
        Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}
      </p>
      <div className="flex mt-4 space-x-2">
        {task.assignedTo.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default ManageProject;
