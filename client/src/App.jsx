import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Signup from './Signup';
import GuideDashboard from './GuideDashboard';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
