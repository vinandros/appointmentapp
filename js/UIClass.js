import { deleteAppoint, editAppoint } from "./app.js";
import { DB } from "./DB.js";
const appointmentsContainer = document.querySelector("#citas");
class UI {
  showAlert(msg, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("text-center", "alert", "d-block", "col-12");
    if (type === "error") {
      msgDiv.classList.add("alert-danger");
    } else {
      msgDiv.classList.add("alert-success");
    }
    msgDiv.textContent = msg;

    document
      .querySelector("#contenido")
      .insertBefore(msgDiv, document.querySelector(".agregar-cita"));
    setTimeout(() => {
      msgDiv.remove();
    }, 3000);
  }
  buildHTMLAppointments() {
    this.clearHTML();

    const objectStore = DB.transaction("appointments").objectStore(
      "appointments"
    );

    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
      console.log(cursor);
      if (cursor) {
        const {
          petName,
          petOwner,
          petOwnerPhoneNumber,
          petCheckInDate,
          petCheckInHour,
          petSymptoms,
          id,
        } = cursor.value;

        const appointDiv = document.createElement("div");
        appointDiv.classList.add("cita", "p-3");
        appointDiv.dataset.id = id;

        const petNameP = document.createElement("h2");
        petNameP.classList.add("cart-title", "font-weight-bolder");
        petNameP.textContent = petName;

        const petOwnerP = document.createElement("p");
        petOwnerP.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${petOwner}
          `;

        const petOwnerPhoneNumberP = document.createElement("p");
        petOwnerPhoneNumberP.innerHTML = `
            <span class="font-weight-bolder">Teléfono: </span> ${petOwnerPhoneNumber}
          `;

        const petCheckInDateP = document.createElement("p");
        petCheckInDateP.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${petCheckInDate}
          `;

        const petCheckInHourP = document.createElement("p");
        petCheckInHourP.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${petCheckInHour}
          `;

        const petSymptomsP = document.createElement("p");
        petSymptomsP.innerHTML = `
            <span class="font-weight-bolder">Síntomas: </span> ${petSymptoms}
          `;

        const deleteAppointBtn = document.createElement("button");
        deleteAppointBtn.classList.add("btn", "btn-danger", "mr-2");
        deleteAppointBtn.innerHTML = `
            Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          `;
        deleteAppointBtn.onclick = () => deleteAppoint(id);

        const editAppointBtn = document.createElement("button");
        const appoint = cursor.value;
        editAppointBtn.onclick = () => editAppoint(appoint);
        editAppointBtn.classList.add("btn", "btn-info");
        editAppointBtn.innerHTML = `
            Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          `;

        appointDiv.appendChild(petNameP);
        appointDiv.appendChild(petOwnerP);
        appointDiv.appendChild(petOwnerPhoneNumberP);
        appointDiv.appendChild(petCheckInDateP);
        appointDiv.appendChild(petCheckInHourP);
        appointDiv.appendChild(petSymptomsP);
        appointDiv.appendChild(deleteAppointBtn);
        appointDiv.appendChild(editAppointBtn);
        appointmentsContainer.appendChild(appointDiv);

        // next element
        cursor.continue();
      }
    };
  }

  clearHTML() {
    while (appointmentsContainer.firstChild) {
      appointmentsContainer.removeChild(appointmentsContainer.firstChild);
    }
  }
}

export default UI;
