import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PatientCard from './component/PatientCard';
import Sidebar from './Sidebar';
import outputCsv from './Data/output.csv';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Function to fetch and parse CSV file from local folder
  useEffect(() => {
    fetch(outputCsv) // Fetch the CSV file
      .then((response) => response.text()) // Convert to text
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length) {
              console.error('Error parsing CSV:', results.errors);
            }

            const formattedPatients = results.data.map((row, index) => ({
              id: row.ID || index + 1,
              hr: row.HR || 120,
              age: row.Age || 18,
              bed: row.Bed || `Bed ${index + 1}`,
              lastChecked: row.LastChecked || 'Not Checked Yet',
              status: row.Status || 'inactive',
            }));

            setPatients(formattedPatients);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch((error) => console.error('Error loading CSV file:', error));
  }, []);

  // Function to trigger file input
  const addNewPatient = () => {
    document.getElementById('output.csv').click();
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Function to view patient details and notes
  const viewPatientDetails = (id) => {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      setSelectedPatient(patient);
    }
  };

  // Function to update notes
  const handleNoteChange = (id, newNote) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: newNote,
    }));
  };

  // Function to close the modal
  const closeDetails = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="app">
      {/* Main content */}
      <div className="main-content">
        <h1>Patient Count: {patients.length}</h1>
        <div className="patient-grid">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={() => setPatients(patients.filter((p) => p.id !== patient.id))}
              onViewDetails={viewPatientDetails}
            />
          ))}
        </div>
        <button onClick={addNewPatient} className="add-patient-button">
          + Add New Patient
        </button>



        {/* Hidden file input for CSV upload */}
        
      </div>

      {/* Sidebar toggle button */}
      <button onClick={toggleSidebar} className="sidebar-toggle-button">
        {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

      {/* Sidebar */}
      {isSidebarVisible && <Sidebar patients={patients} />}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            {/* Patient Header */}
            <div className="patient-header">
              <h2>Patient {selectedPatient.id} Details</h2>
              <span className="viewing-patient">Viewing Patient {selectedPatient.id}</span>
            </div>
            <p>HR: {selectedPatient.hr}</p>
            <p>Age: {selectedPatient.age}</p>
            <p>Bed: {selectedPatient.bed}</p>
            <p> </p>
            <p> </p>

            {/* Note-taking section */}
            <textarea
              placeholder="Write notes here..."
              value={notes[selectedPatient.id] || ''}
              onChange={(e) => handleNoteChange(selectedPatient.id, e.target.value)}
            />

            <button onClick={closeDetails} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;