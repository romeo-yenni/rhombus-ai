import React from 'react';

const PresentCSV = ({ responseData }) => {
  return (
    <div>
      <h2>Inferred Datatypes</h2>
      <div className="response-data">
        {responseData && (
          <>
            <h3>Data Types:</h3>
            <ul>
              {Object.keys(responseData.data_types).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong> {responseData.data_types[key]}
                </li>
              ))}
            </ul>
            <h3>Data:</h3>
            <ul>
              {responseData.data.map((row, rowIndex) => (
                <li key={rowIndex}>
                  <ul>
                    {Object.keys(row).map((column, columnIndex) => (
                      <li key={columnIndex}>
                        <strong>{column}:</strong> {row[column]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PresentCSV;
