//Import
import { database } from "./config.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

//Functions
function writeUserData(userId, userName, password) {
  set(ref(database, "users/" + userId), {
    userName: userName,
    password: password,
  })
    .then(() => {
      alert("User data written successfully");
    })
    .catch((error) => {
      alert("Error writing user data");
    })
    .then(() => {
      window.location.href = "index.html";
    });
}

//Get the login form and add an event listener to it
let loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let userId = new Date().getTime().toString();
  writeUserData(userId, username, password);
});
