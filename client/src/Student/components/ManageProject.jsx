import React, { useState } from 'react';
import { format } from 'date-fns'; // For formatting dates
import DatePicker from 'react-datepicker'; // React DatePicker for calendar
import 'react-datepicker/dist/react-datepicker.css'; // Default DatePicker styles

const teamMembers = [
  { id: '1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' }
]; // Example team members with avatars

function ManageProject() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up MongoDB', description: 'Setup database', dueDate: '2024-10-30', priority: 'High', assignedTo: [{ name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' }], status: 'To Do' },
    { id: 2, title: 'Frontend Development', description: 'Build UI', dueDate: '2024-11-02', priority: 'Medium', assignedTo: [{ name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' }], status: 'In Progress' },
    { id: 3, title: 'API Integration', description: 'Integrate APIs', dueDate: '2024-11-10', priority: 'Low', assignedTo: [{ name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' }], status: 'Completed' }
  ]);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newTask, setNewTask] = useState({
    title: '', description: '', dueDate: null, priority: 'Medium', assignedTo: [], status: 'To Do'
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert('Please fill in all fields');
      return;
    }
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    closeModal();
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-5xl font-extrabold mb-8 text-center text-indigo-700">
        Manage Your Project
      </h2>

      {/* Button to open modal for adding new task */}
      <button
        className="mb-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
        onClick={openModal}
      >
        Add New Task
      </button>

      {/* Kanban board columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* To Do Column */}
        <KanbanColumn title="To Do" tasks={tasks.filter(task => task.status === 'To Do')} updateTaskStatus={updateTaskStatus} />

        {/* In Progress Column */}
        <KanbanColumn title="In Progress" tasks={tasks.filter(task => task.status === 'In Progress')} updateTaskStatus={updateTaskStatus} />

        {/* Completed Column */}
        <KanbanColumn title="Completed" tasks={tasks.filter(task => task.status === 'Completed')} updateTaskStatus={updateTaskStatus} />
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-6">Add New Task</h3>

            {/* Task Title */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                rows="3"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              ></textarea>
            </div>

            {/* Due Date with Calendar */}
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

            {/* Priority Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Assigned Team Members with Checkboxes and Avatars */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Assign to Team Members</label>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map(member => (
                  <label key={member.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight"
                      value={member.id}
                      onChange={(e) => {
                        const selectedMembers = e.target.checked
                          ? [...newTask.assignedTo, { name: member.name, avatar: member.avatar }]
                          : newTask.assignedTo.filter(selected => selected.name !== member.name);
                        setNewTask({ ...newTask, assignedTo: selectedMembers });
                      }}
                    />
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-gray-700">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Buttons */}
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

// Kanban Column component
function KanbanColumn({ title, tasks, updateTaskStatus }) {
  return (
    <div>
      <h3 className="text-3xl font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="space-y-6">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
    </div>
  );
}

// Kanban Card component for each task
function KanbanCard({ task, updateTaskStatus }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all transform hover:shadow-xl hover:scale-105 duration-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold text-gray-800">{task.title}</h4>
        <select
          className="bg-gray-100 text-gray-600 rounded-md p-2"
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <p className="text-gray-500 mb-2">Due: <span className="font-semibold">{format(new Date(task.dueDate), 'yyyy-MM-dd')}</span></p>
      <div className="flex items-center mb-2">
        <span className={`font-semibold text-${task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}-500`}>
          Priority: {task.priority}
        </span>
      </div>
      
      {/* Display assigned members' avatars */}
      <div className="flex flex-wrap mt-2">
        {task.assignedTo.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md mr-2"
            title={member.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageProject;
