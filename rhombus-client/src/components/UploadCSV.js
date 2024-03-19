import React, { useState } from 'react';
import './UploadCSV.css';

const UploadCSV = ({ onResponse }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_type', fileType);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/infer', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onResponse(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload CSV or Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
        <select value={fileType} onChange={handleFileTypeChange}>
          {/* <option value="">Select file type</option> */}
          <option value="csv">CSV</option>
          <option value="excel">Excel</option>
        </select>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCSV;
