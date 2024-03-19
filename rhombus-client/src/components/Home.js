import './Home.css';
import React, { useState } from 'react';
import Navbar from './Navbar';
import UploadCSV from './UploadCSV';
import PresentCSV from './PresentCSV'

const Home = () => {
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

export default Home;
