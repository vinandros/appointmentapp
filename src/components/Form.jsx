import React from "react";
import Alert from "./Alert";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Form = ({
  setAppointmentsData,
  appointmentsData,
  setEditing,
  editing,
  appointmentEditing,
  setAppointmentEditing,
}) => {
  const [appointmentData, setAppointmentData] = React.useState({});
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  React.useEffect(() => {
    setAppointmentData(appointmentEditing);
  }, [appointmentEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dataValidation(appointmentData)) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    if (editing) {
      setAppointmentsData(
        appointmentsData
          .filter((appointment) => appointment.id !== appointmentEditing.id)
          .concat({ id: appointmentEditing.id, ...appointmentData })
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEditing(false);
      }, 3000);
      setAppointmentEditing({});
    } else {
      setAppointmentsData([
        ...appointmentsData,
        { id: uuidv4(), ...appointmentData },
      ]);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }

    e.target.reset();
  };

  const dataValidation = (appointmentData) => {
    let ok = true;
    const values = Object.values(appointmentData);

    //checking
    if (values.some((appointmentInput) => appointmentInput === "")) {
      ok = false;
    }

    return ok;
  };

  return (
    <div className="p-3 p-md-5">
      <h3 className="py-2">Add Pet details:</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group  my-4">
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            className="form-control d-block w-100"
            id="petName"
            name="petName"
            placeholder="Bobby"
            onChange={handleChange}
            required
            defaultValue={editing ? appointmentData.petName : ""}
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
            onChange={handleChange}
            required
            defaultValue={editing ? appointmentData.ownerName : ""}
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
            onChange={handleChange}
            required
            defaultValue={editing ? appointmentData.phoneNumber : ""}
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="checkIn">Check in Date:</label>
          <input
            type="date"
            className="form-control"
            id="checkIn"
            name="checkIn"
            onChange={handleChange}
            required
            defaultValue={editing ? appointmentData.checkIn : ""}
          />
        </div>
        <div className="form-group  my-4">
          <label htmlFor="time">Hour:</label>
          <input
            type="time"
            onChange={handleChange}
            className="form-control"
            id="time"
            name="time"
            required
            defaultValue={editing ? appointmentData.time : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            className="form-control"
            id="symptoms"
            rows="3"
            name="symptoms"
            placeholder="Describe symptoms"
            onChange={handleChange}
            required
            defaultValue={editing ? appointmentData.symptoms : ""}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {editing ? "Save changes" : "Add new Appointment"}
        </button>
        {error && (
          <Alert
            type={"danger"}
            msg={"¡Error!, Please fill out fields properly."}
          />
        )}
        {success && (
          <Alert
            type={"success"}
            msg={
              editing
                ? "¡Success!, Appointment changed."
                : "¡Success!, Appointment added to the list."
            }
          />
        )}
      </form>
    </div>
  );
};

Form.propTypes = {
  setAppointmentsData: PropTypes.func.isRequired,
  appointmentsData: PropTypes.array.isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  appointmentEditing: PropTypes.object.isRequired,
  setAppointmentEditing: PropTypes.func.isRequired,
};

export default Form;
