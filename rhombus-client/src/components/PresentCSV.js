import React, { useState } from 'react';
import './PresentCSV.css';

const PresentCSV = ({ responseData }) => {
  const [customDataTypes, setCustomDataTypes] = useState({});

  const handleDataTypeChange = (columnName, dataType) => {
    setCustomDataTypes({
      ...customDataTypes,
      [columnName]: dataType
    });
  };

  if (typeof responseData === 'string') {
    return (
      <div className="string-data">
        <pre>{responseData}</pre>
      </div>
    );
  }

  return (
    <div className="dataframe-container">
      {responseData && (
        <div className="table-wrapper">
          <table className="dataframe">
            <thead>
              <tr>
                {Object.keys(responseData.data_types).map((column, index) => (
                  <th key={index}>
                    {column} ({customDataTypes[column] || responseData.data_types[column]})
                    <select
                      value={customDataTypes[column] || ""}
                      onChange={(e) => handleDataTypeChange(column, e.target.value)}
                    >
                      <option value="">Change</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Integer">Integer</option>
                      <option value="Float">Float</option>
                      <option value="Complex">Complex</option>
                      <option value="Date">Category</option>
                      <option value="Date">Date</option>
                      <option value="Δ Time">Δ Time</option> 
                      <option value="Text">Text</option>
                    </select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseData.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([column, value], colIndex) => (
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
