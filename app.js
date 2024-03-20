// // // Import the functions you need from the SDKs you need

// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// // import {
// //   getAuth,
// //   createUserWithEmailAndPassword,
// // } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // document.addEventListener('DOMContentLoaded', function() 
// // {
// // const firebaseConfig = {
// //   apiKey: "AIzaSyByniKmToWJzO_SbJISCxZNS3GB3F1kwsk",
// //   authDomain: "loginpage-5aa87.firebaseapp.com",
// //   databaseURL: "https://loginpage-5aa87-default-rtdb.firebaseio.com",
// //   projectId: "loginpage-5aa87",
// //   storageBucket: "loginpage-5aa87.appspot.com",
// //   messagingSenderId: "955371159094",
// //   appId: "1:955371159094:web:f52b6446844dab4d756297",
// // };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// //submit button
// const submit = document.getElementById("submit");
// submit.addEventListener("click", function (event) {
//   event.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       alert("Creating Account..");
//       window.location.href="grand.html";
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//     });
// });
