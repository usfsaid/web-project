// Start Header

// toggle
let minu = document.querySelector(".toggle-menu");
let nav = document.querySelector(".nav-bar ul");
minu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

//get offers button and add event listener to it
let offersBtn = document.querySelector(".offers .btn");
let modal = document.querySelector("#offersModal");
let modalClose = document.querySelector("#modalClose");
let claimBtn = document.querySelector("#claimBtn");

// ✅ open modal on Book Now click
offersBtn.addEventListener("click", function () {
  modal.classList.add("show");
});

// ✅ close on X button
modalClose.addEventListener("click", function () {
  modal.classList.remove("show");
});

// ✅ close when clicking outside the box
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// ✅ claim button action
claimBtn.addEventListener("click", function () {
  modal.classList.remove("show");
  window.location.href = "signup.html";
});

// Custom alert function

// End Header
import { database } from "./config.js";
import {
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

function showAlert(message, callback) {
  const overlay = document.querySelector("#customAlert");
  const msg = document.querySelector("#alertMessage");
  const okBtn = document.querySelector("#alertOk");

  msg.textContent = message;
  overlay.classList.add("show");

  okBtn.onclick = function () {
    overlay.classList.remove("show");
    if (callback) callback();
  };
}

function dataUser(yourName, email, message, onSuccess) {
  const usersRef = ref(database, "users");

  get(usersRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        showAlert("No users found. Please sign up.", () => {});
        return;
      }

      let userFound = false;
      let nameCorrect = false;

      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();

        if (userData.email?.toLowerCase() === email.toLowerCase()) {
          userFound = true;
          if (userData.yourName?.toLowerCase() === yourName.toLowerCase()) {
            nameCorrect = true;
          }
        }
      });

      if (!userFound) {
        showAlert("User not found. Please sign up.", () => {
          window.location.href = "signup.html";
        });
      } else if (!nameCorrect) {
        showAlert("Please enter the correct name.");
      } else {
        onSuccess();
      }
    })
    .catch((error) => {
      console.error("Firebase error:", error);
      showAlert("Something went wrong. Please try again.");
    });
}

let contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let yourName = document.querySelector("#yourName").value.trim();
  let email = document.querySelector("#email").value.trim();
  let message = document.querySelector("#message").value.trim();

  if (yourName === "" || email === "" || message === "") {
    showAlert("Please fill in all fields.");
    return;
  }

  dataUser(yourName, email, message, () => {
    showAlert("Message sent successfully!");
    contactForm.reset();
  });
});
