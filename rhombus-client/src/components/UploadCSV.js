
import React, { useState } from 'react';
import './UploadCSV.css';

const UploadCSV = ({ onResponse }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/infer', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onResponse(data);
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCSV;
