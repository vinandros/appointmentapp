class Appointment {
  constructor() {
    this.appointments = [];
  }

  addAppointment(newAppointment) {
    this.appointments = [...this.appointments, newAppointment];
    // console.log(this.appointments);
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter((appoint) => appoint.id != id);
  }

  editAppointment(appointUpdated) {
    console.log(appointUpdated);
    this.appointments = this.appointments.map((appoint) =>
      appoint.id === appointUpdated.id ? appointUpdated : appoint
    );
  }
}

export default Appointment;
