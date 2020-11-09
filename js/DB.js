export let DB;
import { ui } from "./app.js";
export function createDB() {
  const builDB = window.indexedDB.open("appointments", 1);

  builDB.onerror = function () {
    console.log("Hubo un error");
  };

  builDB.onsuccess = function () {
    console.log("Exito!");
    DB = builDB.result;
    console.log(DB);
    ui.buildHTMLAppointments();
  };

  builDB.onupgradeneeded = function (e) {
    const DB = e.target.result;

    const objectStore = DB.createObjectStore("appointments", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("petName", "petName", { unique: false });
    objectStore.createIndex("petOwner", "petOwner", { unique: false });
    objectStore.createIndex("petOwnerPhoneNumber", "petOwnerPhoneNumber", {
      unique: false,
    });
    objectStore.createIndex("petCheckInDate", "petCheckInDate", {
      unique: false,
    });
    objectStore.createIndex("petCheckInHour", "petCheckInHour", {
      unique: false,
    });
    objectStore.createIndex("petSymptoms", "petSymptoms", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });
  };
}
