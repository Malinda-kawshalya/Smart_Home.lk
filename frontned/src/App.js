
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



// Import pages
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <div className="App d-flex">
        
        
        <main className="content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;