// Start Header

// toggle
let minu = document.querySelector(".toggle-menu");
let nav = document.querySelector(".nav-bar ul");
minu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// End Header
import { database } from "./config.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
function writeUserData(userId, name, email, message) {
  set(ref(database, "contactMessages/" + userId), {
    name: name,
    email: email,
    message: message,
  })
    .then(() => {
      alert("Message sent successfully");
    })
    .catch((error) => {
      alert("Error sending message");
    });
}
let contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;
  let userId = new Date().getTime().toString();
  writeUserData(userId, name, email, message);
});
