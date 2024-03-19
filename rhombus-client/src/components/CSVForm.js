import React, { useState } from 'react';
import './CSVForm.css'; // Import CSS file for styling

const CsvInputForm = () => {
  // State to hold the CSV file
  const [csvFile, setCsvFile] = useState(null);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvFile) {
      // Use FormData to send file to backend
      const formData = new FormData();
      formData.append('csvFile', csvFile);

      // Example: Post formData to backend endpoint
      fetch('http://example.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // Handle response
          console.log(response);
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
        });
    } else {
      alert('Please select a CSV file');
    }
  };

  return (
    <div className="csv-input-form">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CsvInputForm;
