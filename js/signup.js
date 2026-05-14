//Import
import { database } from "./config.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Custom alert function
function showAlert(message, callback) {
  const overlay = document.querySelector("#customAlert");
  const msg = document.querySelector("#alertMessage");
  const okBtn = document.querySelector("#alertOk");

  msg.textContent = message;
  overlay.classList.add("show");

  okBtn.onclick = function () {
    overlay.classList.remove("show");
    if (callback) callback(); // runs redirect after OK is clicked
  };
}

//Functions
function writeUserData(
  userId,
  yourName,
  email,
  userName,
  password,
  confirmPassword,
) {
  set(ref(database, "users/" + userId), {
    yourName: yourName,
    email: email,
    userName: userName,
    password: password,
    confirmPassword: confirmPassword,
  }).then(() => {
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", () => {
        window.location.href = "signup.html";
      });
      return;
    }
    if (
      yourName === "" ||
      email === "" ||
      userName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      showAlert("Please fill in all fields", () => {
        return;
      });
      return;
    } else if (userId === userId && email === email && userName === userName) {
      showAlert("User already exists! Please log in.", () => {
        window.location.href = "login.html";
      });
    } else {
      showAlert("User registered successfully!", () => {
        window.location.href = "index.html";
      });
    }
  });
}

//Get the signup form and add an event listener to it
let signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let yourName = document.querySelector("#yourname").value;
  let email = document.querySelector("#email").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmpassword").value;
  let userId = new Date().getTime().toString();
  writeUserData(userId, yourName, email, username, password, confirmPassword);
});
