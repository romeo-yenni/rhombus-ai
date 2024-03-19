import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import React from 'react';
import Home from './components/Home';
import AuthorPage from './components/Author';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home/>} /> 
        <Route path="/author" element={<AuthorPage/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
