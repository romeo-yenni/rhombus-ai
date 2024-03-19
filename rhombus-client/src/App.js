import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HelloWorld from './components/HelloWorld';
import UploadCSV from './components/UploadCSV';
import PresentCSV from './components/PresentCSV'

const App = () => {
  const [responseData, setResponseData] = useState(null);

  const handleResponse = (data) => {
    setResponseData(data);
  };

  return (
    <>
      <Navbar></Navbar>

      <div className='main-content' >
          <UploadCSV onResponse={handleResponse} />
          <PresentCSV responseData={responseData} />
      </div>
    
    </>
  );
};

export default App;
