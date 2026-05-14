//Import
import { database } from "./config.js";
import {
  ref,
  set,
  get,
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

function loginUser(userName, password, email) {
  // Reference to all users
  const usersRef = ref(database, "users");

  get(usersRef).then((snapshot) => {
    if (!snapshot.exists()) {
      showAlert("No users found. Please sign up.", () => {
        window.location.href = "signup.html";
      });
      return;
    }

    let userFound = false;

    // Loop through all users to find matching userName
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();

      if (userData.userName === userName && userData.email === email) {
        userFound = true;

        if (userData.password === password) {
          showAlert("Logged in successfully!", () => {
            window.location.href = "index.html";
          });
        } else {
          showAlert("Incorrect password.", () => {
            window.location.href = "login.html";
          });
        }
      }
    });

    if (!userFound) {
      showAlert("User not found. Please sign up.", () => {
        window.location.href = "signup.html";
      });
    }
  });
}

let loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let email = document.querySelector("#email").value;

  if (userName === "" || password === "" || email === "") {
    showAlert("Please fill in all fields.");
    return;
  }

  loginUser(userName, password, email);
});
