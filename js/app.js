import Appointment from "./AppointmetClass.js";
import UI from "./UIClass.js";
import { createDB, DB } from "./DB.js";
const petNameInput = document.querySelector("#mascota");
const petOwnerInput = document.querySelector("#propietario");
const petOwnerPhoneNumberInput = document.querySelector("#telefono");
const petCheckInDateInput = document.querySelector("#fecha");
const petCheckInHourInput = document.querySelector("#hora");
const petSymptomsInput = document.querySelector("#sintomas");

const form = document.querySelector("#nueva-cita");
let editing;

window.onload = () => {
  eventListeners();
  // indexedDB.deleteDatabase("appointments").onsuccess = function () {
  //   console.log("Delete OK");
  // };
  createDB();
};

const appointment = new Appointment();
export const ui = new UI();

function eventListeners() {
  petNameInput.addEventListener("input", dataAppointment);
  petOwnerInput.addEventListener("input", dataAppointment);
  petOwnerPhoneNumberInput.addEventListener("input", dataAppointment);
  petCheckInDateInput.addEventListener("input", dataAppointment);
  petCheckInHourInput.addEventListener("input", dataAppointment);
  petSymptomsInput.addEventListener("input", dataAppointment);

  form.addEventListener("submit", addNewAppointment);
}

const appointmentObj = {
  petName: "",
  petOwner: "",
  petOwnerPhoneNumber: "",
  petCheckInDate: "",
  petCheckInHour: "",
  petSymptoms: "",
};

function dataAppointment(e) {
  appointmentObj[e.target.name] = e.target.value;
}

function addNewAppointment(e) {
  e.preventDefault();
  const {
    petName,
    petOwner,
    petOwnerPhoneNumber,
    petCheckInDate,
    petCheckInHour,
    petSymptoms,
  } = appointmentObj;

  if (
    petName === "" ||
    petOwner === "" ||
    petOwnerPhoneNumber === "" ||
    petCheckInDate === "" ||
    petCheckInHour === "" ||
    petSymptoms === ""
  ) {
    ui.showAlert("Todos los campos son oblicatorios.", "error");
    return;
  }
  if (editing) {
    appointment.editAppointment({ ...appointmentObj });

    const transaction = DB.transaction(["appointments"], "readwrite");

    const objectStore = transaction.objectStore("appointments");

    objectStore.put(appointmentObj);
    transaction.oncomplete = () => {
      ui.showAlert("Editado correctamente.");

      form.querySelector('button[type="submit"]').textContent = "Crear cita";

      editing = false;
    };

    transaction.onerror = function () {
      console.log("Hubo un error!");
    };
  } else {
    appointmentObj.id = Date.now();

    appointment.addAppointment({ ...appointmentObj });

    const transaction = DB.transaction(["appointments"], "readwrite");

    const objectStore = transaction.objectStore("appointments");

    objectStore.add(appointmentObj);

    transaction.oncomplete = () => {
      console.log("cita agregada");
      ui.showAlert("Se agregó correctamente.");
    };
  }

  form.reset();
  resetAppointmentObj();

  ui.buildHTMLAppointments();
}

function resetAppointmentObj() {
  appointmentObj.petName = "";
  appointmentObj.petOwner = "";
  appointmentObj.petOwnerPhoneNumber = "";
  appointmentObj.petCheckInDate = "";
  appointmentObj.petCheckInHour = "";
  appointmentObj.petSymptoms = "";
}

export function deleteAppoint(id) {
  const transaction = DB.transaction(["appointments"], "readwrite");
  const objectStore = transaction.objectStore("appointments");
  objectStore.delete(id);

  transaction.oncomplete = function () {
    ui.showAlert("La cita se eliminó correctamente.");
    ui.buildHTMLAppointments();
  };

  transaction.onerror = function () {
    ui.showAlert("Hubo un error, por favor intentelo nuevamente.");
  };
}

export function editAppoint(appoint) {
  const {
    petName,
    petOwner,
    petOwnerPhoneNumber,
    petCheckInDate,
    petCheckInHour,
    petSymptoms,
    id,
  } = appoint;

  petNameInput.value = petName;
  petOwnerInput.value = petOwner;
  petOwnerPhoneNumberInput.value = petOwnerPhoneNumber;
  petCheckInDateInput.value = petCheckInDate;
  petCheckInHourInput.value = petCheckInHour;
  petSymptomsInput.value = petSymptoms;

  appointmentObj.petName = petName;
  appointmentObj.petOwner = petOwner;
  appointmentObj.petOwnerPhoneNumber = petOwnerPhoneNumber;
  appointmentObj.petCheckInDate = petCheckInDate;
  appointmentObj.petCheckInHour = petCheckInHour;
  appointmentObj.petSymptoms = petSymptoms;
  appointmentObj.id = id;

  form.querySelector('button[type="submit"]').textContent = "Guardar cambios";

  editing = true;
}
