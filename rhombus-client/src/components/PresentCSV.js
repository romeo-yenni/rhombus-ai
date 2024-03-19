import React from 'react';

const PresentCSV = ({ responseData }) => {
  return (
    <div className="dataframe-container">
      {responseData && (
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
      )}
    </div>
  );
};

export default PresentCSV;
