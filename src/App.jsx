import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import AppointmentsList from "./components/AppointmentsList";
import "./custom.scss";

export default function App() {
  const [appointmentData, setAppointmentData] = React.useState({});
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col py-3">
          <Header />
        </div>
      </div>
      <div className="row col-9 col-md-11  mx-auto bg-white rounded">
        <div className="col-5 col-md-6">
          <Form
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
          />
        </div>
        <div className="col">
          <AppointmentsList appointmentData={appointmentData} />
        </div>
      </div>
    </div>
  );
}
