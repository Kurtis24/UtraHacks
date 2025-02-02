import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PatientCard from './component/PatientCard';
import Sidebar from './Sidebar';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', hr: 120, age: 25, bed: 1, lastChecked: 'John Doe, 10:00 AM', status: 'active' },
    { id: 2, name: 'Jane Doe', hr: 110, age: 30, bed: 2, lastChecked: 'John Doe, 11:00 AM', status: 'active' },
    { id: 3, name: 'Alice', hr: 130, age: 35, bed: 3, lastChecked: 'John Doe, 12:00 PM', status: 'active' },
    { id: 4, name: 'Bob', hr: 140, age: 40, bed: 4, lastChecked: 'John Doe, 1:00 PM', status: 'active' },
  ]);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to manage sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Function to add new patients from a CSV file
  const addNewPatient = () => {
    // Trigger file input click
    document.getElementById('output.csv').click();
  };

  // Function to handle file upload and parse CSV data
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assumes the first row in the CSV is the header
        dynamicTyping: true, // Automatically convert numeric values to numbers
        complete: (results) => {
          const newPatients = results.data.map((row, index) => ({
            id: patients.length + index + 1,
            name: row.Name || `Name ${patients.length + index + 13}`,
            hr: row.HR || 120,
            age: row.Age || 12,
            bed: row.Bed || 1,
            lastChecked: row.LastChecked || 'John Doe, Just Added',
            status: row.Status || 'active',
          }));
          setPatients([...patients, ...newPatients]);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  // Function to delete a patient
  const deletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  // Function to update the last checked time for a patient
  const handleCheck = (id) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === id
        ? { ...patient, lastChecked: `John Doe, ${new Date().toLocaleTimeString()}` }
        : patient
    );
    setPatients(updatedPatients);
  };

  // Automatically load data from a CSV file when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./Data/data.csv'); // Path to your CSV file
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const newPatients = results.data.map((row, index) => ({
              id: patients.length + index + 1,
              name: row.Name || `Name ${patients.length + index + 13}`,
              hr: row.HR || 120,
              age: row.Age || 12,
              bed: row.Bed || 1,
              lastChecked: row.LastChecked || 'John Doe, Just Added',
              status: row.Status || 'active',
            }));
            setPatients([...patients, ...newPatients]);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="app">
      {/* Main content */}
      <div className="main-content">
        <h1>Patient Count: {patients.length}</h1>
        <div className="patient-grid">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onDelete={deletePatient} />
          ))}
        </div>
        <button onClick={addNewPatient} className="add-patient-button">
          + Add New Patient
        </button>
        {/* Hidden file input for CSV upload */}
        <input
          id="csv-file-input"
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Sidebar toggle button */}
      <button onClick={toggleSidebar} className="sidebar-toggle-button">
        {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

      {/* Sidebar */}
      {isSidebarVisible && <Sidebar patients={patients} onCheck={handleCheck} />}
    </div>
  );
};

export default App;