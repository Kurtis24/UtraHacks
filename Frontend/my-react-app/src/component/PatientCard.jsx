import React from 'react';
import './PatientCard.css'; // Create this file for styling

const PatientCard = ({ patient, onDelete }) => {
  return (
    <div className="patient-card">
      <h2>{patient.name}</h2>
      <p>HR: {patient.hr}</p>
      <p>Age: {patient.age}</p>
      <p>Bed: {patient.bed}</p>
      <p>Last Checked: {patient.lastChecked}</p>
      <div className={`status-dot ${patient.status}`}></div>
      <button onClick={() => onDelete(patient.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default PatientCard;