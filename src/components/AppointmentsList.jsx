import React from "react";
import Appointment from "./Appointment";
import PropTypes from "prop-types";

const AppointmentsList = ({
  appointmentsData,
  setAppointmentsData,
  setAppointmentEditing,
  setEditing,
}) => {
  const handleDelete = (id) => {
    const result = appointmentsData.filter(
      (appointment) => appointment.id !== id
    );
    setAppointmentsData([...result]);
  };
  const handleEdit = (id) => {
    setEditing(true);
    setAppointmentEditing(
      appointmentsData.filter((appointment) => appointment.id === id)[0]
    );
  };

  return (
    <div className="p-3 p-md-5">
      <h3 className="py-2">Appointments List:</h3>
      {appointmentsData.length == 0 && (
        <h6 className="text-muted mt-2">No appointments get.</h6>
      )}
      <div className="my-4">
        {appointmentsData.reverse().map((appointment) => (
          <Appointment
            key={appointment.id.toString()}
            appointmentData={appointment}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

AppointmentsList.propTypes = {
  appointmentsData: PropTypes.array.isRequired,
  setAppointmentsData: PropTypes.func.isRequired,
  setAppointmentEditing: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default AppointmentsList;
