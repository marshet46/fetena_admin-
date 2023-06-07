import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ExcelImport = () => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        await axios.post('http://127.0.0.1:8000/question/question-create/', jsonData);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please try again.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Import Excel file:
        <input type="file" onChange={handleChange} />
      </label>
      <button type="submit">Import</button>
    </form>
  );
};

export default ExcelImport;