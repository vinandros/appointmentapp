import React from "react";

const Appointment = ({ appointmentData, handleDelete, handleEdit }) => {
  return (
    <div className="card mt-2" style={{ width: 18 + "rem" }}>
      <div className="card-body">
        <h5 className="card-title">Pet Name: {appointmentData.petName}</h5>
        <h6 className="card-subtitle  mb-2">
          Check in Date: {appointmentData.checkIn}
        </h6>
        <h6 className="card-subtitle  mb-2">Time: {appointmentData.time}</h6>
        <h6 className="card-subtitle mb-2 text-muted">
          Pet Owner: {appointmentData.ownerName}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">
          Phone number:{appointmentData.phoneNumber}
        </h6>
        <p className="card-text">Symptoms: {appointmentData.symptoms}</p>
        <button
          type="button"
          onClick={() => handleEdit(appointmentData.id)}
          className="btn btn-warning mr-2"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDelete(appointmentData.id)}
          className="btn btn-danger card-link"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Appointment;
