import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileApp } from './Profile.tsx';
import { Authentication } from './Login.tsx';
import Dashboard from './Dashboard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/profile" element={<ProfileApp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
