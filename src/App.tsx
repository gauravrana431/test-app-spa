import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import List from './components/List';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav">
              <Link className="nav-link" to="/list">List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
