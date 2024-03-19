import React, { useState } from 'react';
import Navbar from './Navbar';
import UploadCSV from './UploadCSV';
import PresentCSV from './PresentCSV';
import './Home.css'

const Home = () => {
  const [responseData, setResponseData] = useState(null);

  const handleResponse = (data) => {
    setResponseData(data);
  };

  return (
    <>
      <Navbar></Navbar>

      <div className='main-content' >
        <div className="centered-container">
          <UploadCSV onResponse={handleResponse} />
          <PresentCSV responseData={responseData} />
        </div>
      </div>
    </>
  );
};

export default Home;
