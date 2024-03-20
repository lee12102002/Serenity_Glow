// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArGlLkhajZLrcDh0TeG3iL5GZdl8ZjWhM",
    authDomain: "newlogin-5ed37.firebaseapp.com",
    projectId: "newlogin-5ed37",
    storageBucket: "newlogin-5ed37.appspot.com",
    messagingSenderId: "1033268006588",
    appId: "1:1033268006588:web:07bea3dba558ba5b450ab9",
    measurementId: "G-HMDJLJBFJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to handle login
const login = async (emailValue, passwordValue) => {
    try {
        // Check if the entered email is admin email
        if (emailValue === "sofiyaliyakathali@gmail.com") {
            // Redirect to adminIndex.html page
            window.location.replace('adminIndex.html');
            return;
        }

        // Perform login for regular users
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        const user = userCredential.user;

        // Redirect to index.html page
        console.log("Regular user logged in successfully!");
        window.location.replace('index.html');
    } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Error logging in: " + error.message);
    }
};

// Function to handle signup
const signup = async (emailValue, passwordValue) => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        const user = userCredential.user;

        // Add user data to Firestore
        const userDocRef = doc(db, "Customer", user.uid); // Assuming "Customer" is your collection name
        const userData = {
            email: emailValue,
            password: passwordValue
            // Add more user data here if needed
        };
        await setDoc(userDocRef, userData);

        // Redirect based on user email
        if (emailValue === "sofiyaliyakathali@gmail.com" || emailValue === "sofiyaliyakathali@gmail.com") {
            window.location.replace('adminIndex.html'); // Redirect to admin index page
        } else {
            window.location.replace('index.html'); // Redirect to user index page
        }
    } catch (error) {
        console.error("Error signing up:", error.message);
        alert("Error signing up: " + error.message);
    }
};

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    login(emailValue, passwordValue);
});

// Event listener for signup form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    signup(emailValue, passwordValue);
});
