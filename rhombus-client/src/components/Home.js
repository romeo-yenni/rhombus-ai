import React, { useState, useEffect } from 'react';
import UploadCSV from './UploadCSV';
import PresentCSV from './PresentCSV';
import './Home.css'

const Home = () => {

  useEffect(() => {
    document.title = 'Data Inference';
    });

  const [responseData, setResponseData] = useState(null);

  const handleResponse = (data) => {
    setResponseData(data);
  };

  return (
    <>
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
