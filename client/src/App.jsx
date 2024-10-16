import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import GuideDashboard from './Guide/GuideDashboard';
import StudentDashboard from './Student/StudentDashboard';
import Team from "./Student/components/Team";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/team" element={< Team/>} />
        
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
