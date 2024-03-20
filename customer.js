// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the Firebase app instance to getAuth
const db = getFirestore(app);
// Function to fetch all customers
const fetchAllCustomers = async () => {
    try {
        const response = await fetch("https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents/Customer");
        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        return data.documents.map(doc => ({
            id: doc.name,
            name: doc.fields.name.stringValue,
            email: doc.fields.email.stringValue,
            creditLimit: doc.fields.creditLimit.integerValue
        }));
    } catch (error) {
        console.error("Error fetching customers:", error.message);
        return [];
    }
};

// Export function
export { fetchAllCustomers };
