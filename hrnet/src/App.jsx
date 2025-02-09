import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './screens/employee-list/EmployeeList';
import EmployeeCreation from './screens/employee-creation/EmployeeCreation';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList/>} />
        <Route path="/new-employee" element={<EmployeeCreation/>} />
      </Routes>
    </Router>
  );
};

export default App
