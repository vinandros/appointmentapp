import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import AppointmentsList from "./components/AppointmentsList";
import "./custom.scss";

export default function App() {
  const [editing, setEditing] = React.useState(false);
  const [appointmentEditing, setAppointmentEditing] = React.useState({});
  const [appointmentsData, setAppointmentsData] = React.useState([]);
  React.useEffect(() => {
    setAppointmentsData(JSON.parse(localStorage.getItem("appointments")));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointmentsData));
  }, [appointmentsData]);
  return (
    <div className="container-fluid col-md-7">
      <div className="row">
        <div className="col py-3">
          <Header />
        </div>
      </div>
      <div className="row d-flex mx-auto bg-white rounded">
        <div className="col">
          <Form
            appointmentsData={appointmentsData}
            setAppointmentsData={setAppointmentsData}
            editing={editing}
            appointmentEditing={appointmentEditing}
            setAppointmentEditing={setAppointmentEditing}
            setEditing={setEditing}
          />
        </div>
        <div className="col">
          <AppointmentsList
            appointmentsData={appointmentsData}
            setAppointmentsData={setAppointmentsData}
            setEditing={setEditing}
            editing={editing}
            setAppointmentEditing={setAppointmentEditing}
          />
        </div>
      </div>
    </div>
  );
}
