import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import { Registration } from './components/Registration';
import Signup from './components/HomeSignup';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Home" element={<HomePage />} />
      <Route path="/login" element={<Registration />} />
      <Route path="/signup" element={<Signup />} />
</Routes>

    </Router>
  );
} 

export default App;
