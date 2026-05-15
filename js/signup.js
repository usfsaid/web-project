// 1. Imports
import { database } from "./config.js";
import {
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// 2. Custom alert function
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

// 3. The logic function
function writeUserData(
  userId,
  yourName,
  email,
  userName,
  password,
  confirmPassword,
) {
  // Check passwords first
  if (password !== confirmPassword) {
    showAlert("Passwords do not match!");
    return;
  }

  const dbRef = ref(database);

  // STEP 1: Search the database for existing users
  get(child(dbRef, "users"))
    .then((snapshot) => {
      let userExists = false;

      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        // Loop through all users to see if email or username is already taken
        for (let id in allUsers) {
          if (
            allUsers[id].email === email ||
            allUsers[id].userName === userName
          ) {
            userExists = true;
            break;
          }
        }
      }

      // STEP 2: Decide what alert to show
      if (userExists) {
        // Not a first-time signup for this email
        showAlert("User already exists! Please log in.", () => {
          window.location.href = "login.html";
        });
      } else {
        // FIRST SIGNUP: Save the data now
        set(ref(database, "users/" + userId), {
          yourName: yourName,
          email: email,
          userName: userName,
          password: password,
        }).then(() => {
          showAlert("User registered successfully!", () => {
            window.location.href = "index.html";
          });
        });
      }
    })
    .catch((error) => {
      console.error("Firebase Error:", error);
      showAlert("Something went wrong. Please try again.");
    });
}

// 4. Form Event Listener
let signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let yourName = document.querySelector("#yourname").value.trim();
  let email = document.querySelector("#email").value.trim();
  let username = document.querySelector("#username").value.trim();
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmpassword").value;

  // Create a unique ID based on the current timestamp
  let userId = new Date().getTime().toString();

  // Basic validation for empty fields
  if (!yourName || !email || !username || !password || !confirmPassword) {
    showAlert("Please fill in all fields!");
    return;
  }

  writeUserData(userId, yourName, email, username, password, confirmPassword);
});
