'use strict';

/**
 * add event on element
 */
document.getElementById("userButton").addEventListener("click", function(event) {
    // Check if the clicked element is the user symbol
    if (event.target.classList.contains("header-action-btn")) {
        // If yes, redirect to index.html
        window.location.href = "index.html";
    }
});

               
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header sticky & back top btn active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);

/**
 * scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/**
 * Function to handle showing products for each category
 */
const showProducts = function (category) {
  // Assuming you have a function to fetch and display products based on the category
  console.log("Showing products for category: " + category);
  // You can replace the log statement with code to fetch and display products
}

/**
 * Event listeners for each category
 */
const categoryLinks = document.querySelectorAll("[data-category-link]");

const handleCategoryClick = function (event) {
  const category = event.target.dataset.categoryLink;
  showProducts(category);
}

addEventOnElem(categoryLinks, "click", handleCategoryClick);

// Define product details for each category
const products = {
  sunscreen: [
    { id: 1, name: "Sunscreen 1", price: "$10", description: "Description of Sunscreen 1" },
    { id: 2, name: "Sunscreen 2", price: "$15", description: "Description of Sunscreen 2" },
    { id: 3, name: "Sunscreen 3", price: "$20", description: "Description of Sunscreen 3" }
  ],
  // Define other categories and their products similarly
};

// Function to display suggestions for a category
const showSuggestions = function (category) {
  const productList = products[category];
  productList.forEach(product => {
    console.log(`Suggestion: ${product.name} - ${product.price}`);
  });
};

// Function to display product details
const showProductDetails = function (productId) {
  // Fetch product details based on productId and display
  console.log("Product details:");
  const product = getProductById(productId);
  console.log(`Name: ${product.name}`);
  console.log(`Price: ${product.price}`);
  console.log(`Description: ${product.description}`);
};

// Helper function to get product details by ID
const getProductById = function (productId) {
  for (const category in products) {
    const productList = products[category];
    const product = productList.find(prod => prod.id === productId);
    if (product) {
      return product;
    }
  }
  return null; // Return null if product is not found
};

// Event listener for category clicks
document.querySelectorAll("[data-category]").forEach(categoryElement => {
  categoryElement.addEventListener("click", function () {
    const category = categoryElement.dataset.category;
    showSuggestions(category);
  });
});

// // Import the functions you need from the SDKs you need
// // Removed import statements for Firebase SDK functions since they're not needed without modules

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDuHjF419C7zAvuZZ37rFYlUWlyM2Rxp48",
//   authDomain: "e-commerce-7dfb2.firebaseapp.com",
//   projectId: "e-commerce-7dfb2",
//   storageBucket: "e-commerce-7dfb2.appspot.com",
//   messagingSenderId: "740168175671",
//   appId: "1:740168175671:web:1f46520c497e5b496eefb2",
//   measurementId: "G-85QPBLDB1N"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Using jQuery AJAX
// $.get("https://e-commerce-7dfb2.firebaseio.com/data.json", function(data) {
//   console.log(data);
// });

// // Using Firebase SDK
// var database = firebase.database();
// database.ref('data').once('value').then(function(snapshot) {
//   var data = snapshot.val();
//   console.log(data);
// });

