import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("login-container");
  const signupContainer = document.getElementById("signup-container");
  const showSignupLink = document.getElementById("show-signup");
  const showLoginLink = document.getElementById("show-login");

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyArGlLkhajZLrcDh0TeG3iL5GZdl8ZjWhM",
    authDomain: "newlogin-5ed37.firebaseapp.com",
    projectId: "newlogin-5ed37",
    storageBucket: "newlogin-5ed37.appspot.com",
    messagingSenderId: "1033268006588",
    appId: "1:1033268006588:web:07bea3dba558ba5b450ab9",
    measurementId: "G-HMDJLJBFJE",
  };
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Function to toggle between login and signup forms
  function toggleForms() {
    loginContainer.style.display =
      loginContainer.style.display === "none" ? "block" : "none";
    signupContainer.style.display =
      signupContainer.style.display === "none" ? "block" : "none";
  }

  // Show signup form when the "Sign up here" link is clicked
  showSignupLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleForms();
  });

  // Show login form when the "Login here" link is clicked
  showLoginLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleForms();
  });

  // Function to handle login with email and password
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log("User authentication token:", idToken);
      return idToken;
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error logging in: " + error.message);
      return null;
    }
  };

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault(); // Prevent form submission
    const emailValue = document.getElementById("login-email").value;
    const passwordValue = document.getElementById("login-password").value;
    try {
      const idToken = await loginWithEmailAndPassword(emailValue, passwordValue);
      if(idToken !== null) {
        // Redirect based on user email
        const userDoc = await getDoc(doc(db, "Customer", emailValue));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.password === passwordValue) {
            if (emailValue === "admin@example.com") {
              window.location.replace("adminIndex.html"); // Redirect to admin index page
            } else {
              window.location.replace("userafterlogin.html"); // Redirect to user after login index page
            }
          } else {
            alert("Incorrect password");
          }
        } else {
          alert("User not found");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error logging in: " + error.message);
    }
  };

  // Event listener for login form submission
  document.getElementById("loginform").addEventListener("submit", login);

  // Function to handle signup form submission
  const signup = async (e) => {
    e.preventDefault(); // Prevent form submission
    const emailValue = document.getElementById("signup-email").value;
    const passwordValue = document.getElementById("signup-password").value;
    const nameValue = document.getElementById("signup-name").value;
    const mobileValue = document.getElementById("signup-mobile").value;
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "Customer", emailValue), {
        email: emailValue,
        fullName: nameValue,
        contact: mobileValue,
        password: passwordValue,
        // Add any other fields you want to store
      });

      alert("User signed up successfully!");

      // Redirect to user after login index page
      window.location.replace("userafterlogin.html");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    }
  };

  // Event listener for signup form submission
  document.getElementById("signupform").addEventListener("submit", signup);
});
