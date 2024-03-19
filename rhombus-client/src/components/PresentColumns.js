import React, { useState, useEffect } from 'react';
import './PresentColumns.css'; // Import CSS file for styling

const PresentColumns = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://example.com/data')
      .then(response => response.json())
      .then(data => {
        // Set the data state
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="data-presentation">
      <h2>Data Presentation</h2>
      <div className="data-container">
        {data.map((item, index) => (
          <div className="data-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {/* Add more elements to display additional data */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresentColumns;
