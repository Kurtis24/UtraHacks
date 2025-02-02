import React from 'react';
import './Sidebar.css';

const Sidebar = ({ patients, onCheck, isVisible }) => {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <h2>Last Checked</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <span>{patient.name} - {patient.lastChecked}</span>
            <button onClick={() => onCheck(patient.id)} className="check-button">
              Check On
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;