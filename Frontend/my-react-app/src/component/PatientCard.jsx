import React from 'react';
import './PatientCard.css';

const PatientCard = ({ patient, onDelete, onViewDetails }) => {
  return (
    <div className="patient-card">
      <h2>ID: {patient.id}</h2>
      <p>BPM: {patient.hr}</p>
      <p>Age: {patient.age}</p>
      <p>Bed: {patient.bed}</p>
      <p>Last Checked: {patient.lastChecked}</p>
      
      <div className={`status-dot ${patient.status}`}></div>
      
      <button className="details-button" onClick={() => onViewDetails(patient.id)}>
        Notes
      </button>
      
      <button className="delete-button" onClick={() => onDelete(patient.id)}>
        Delete
      </button>
    </div>
  );
};

export default PatientCard;
