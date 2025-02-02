import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PatientCard from './component/PatientCard';
import Sidebar from './Sidebar';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([
    
  ]);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to manage sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Function to add new patients from a CSV file
  const addNewPatient = () => {
    // Trigger file input click
    document.getElementById('./Data/output.csv').click();
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

  // Automatically load data from a CSV file via API when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = 'your_api_key_here'; // Replace with your actual API key
        const response = await fetch('http://127.0.0.1:5000', {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }

        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true,
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