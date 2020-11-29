import React from "react";
const Form = ({ setAppointmentData, appointmentData }) => {
  return (
    <div className="p-5">
      <h3 className="py-2">Add Pet details:</h3>
      <form>
        <div className="form-group  my-4">
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            className="form-control"
            id="petName"
            name="petName"
            placeholder="Bobby"
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            name="ownerName"
            placeholder="Arthuro Gómez Herrera"
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="85-36-24-17"
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="checkIn">Check in Date:</label>
          <input
            type="date"
            className="form-control"
            id="checkIn"
            name="checkIn"
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="time">Hour:</label>
          <input type="time" className="form-control" id="time" name="time" />
        </div>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            className="form-control"
            id="symptoms"
            rows="3"
            name="symptoms"
            placeholder="Describe symptoms"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
