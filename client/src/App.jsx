import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GuideDashboard from './Guide/GuideDashboard';
import StudentDashboard from './Student/StudentDashboard';
import Team from "./Student/components/Team";
import ViewTeam from "./Guide/components/ViewTeam";
import Messages from "./Guide/components/Messages";
import Trash from "./Guide/components/Trash";
import TaskAssigned from "./Student/components/TaskAssigned";
import ManageProject from "./Student/components/ManageProject";
import ManageFiles from "./Student/components/ManageFiles";
import Profile from "./pages/Profile";
import StudentMessages from "./Student/components/StudentMessages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/tasks-assigned" element={<TaskAssigned />} /> 
        <Route path="/manage-project" element={<ManageProject />} />
        <Route path="/manage-files" element={<ManageFiles />} />
        <Route path="/team" element={<Team />} />
        <Route path="/teams" element={<ViewTeam gd_id={3} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/student-messages" element={<StudentMessages />} />
        <Route path="/archive" element={<Trash />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;