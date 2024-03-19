import React from 'react';
import './PresentCSV.css'

const PresentCSV = ({ responseData }) => {
  return (
    <div className="dataframe-container">
      {responseData && (
        <div className="table-wrapper">
          <table className="dataframe">
            <thead>
              <tr>
                {Object.keys(responseData.data_types).map((column, index) => (
                  <th key={index}>
                    {column} ({responseData.data_types[column]})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseData.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PresentCSV;
