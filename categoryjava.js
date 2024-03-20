
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore,getDocs,collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyArGlLkhajZLrcDh0TeG3iL5GZdl8ZjWhM",
    authDomain: "newlogin-5ed37.firebaseapp.com",
    projectId: "newlogin-5ed37",
    storageBucket: "newlogin-5ed37.appspot.com",
    messagingSenderId: "1033268006588",
    appId: "1:1033268006588:web:07bea3dba558ba5b450ab9",
    measurementId: "G-HMDJLJBFJE"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch categories and display them as buttons
async function fetchAndDisplayCategories() {
    try {
        const response = await fetch("https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents/Category");
        const data = await response.json();
        data.documents.forEach(doc => {
            const categoryData = doc.fields;
            const categoryId = categoryData.categoryId.stringValue;
            const categoryName = categoryData.categoryname.stringValue;

            // Create a button for each category
            const categoryButton = document.createElement('button');
            categoryButton.textContent = categoryName;
            categoryButton.classList.add('category-btn');
            categoryButton.dataset.categoryId = categoryId; // Store category ID as data attribute
            categoryButton.addEventListener('click', () => {
                fetchAndDisplayProducts(categoryId);
            });

            // Append the button to the categories container
            document.querySelector('.categories').appendChild(categoryButton);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Function to fetch and display products for a specific category
// Function to fetch and display products for a specific category
// Function to fetch and display products for a specific category
// Function to fetch and display products for a specific category
async function fetchAndDisplayProducts(categoryId) {
    try {
        const response = await fetch("https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents/Inventory");
        const data = await response.json();
        const products = data.documents.filter(doc => doc.fields.categoryId.stringValue === String(categoryId));
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


function displayProducts(products) {
    const productListDiv = document.querySelector('.product-list');
    productListDiv.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productName = product.fields.title?.stringValue || "N/A";
        const productPrice = product.fields.price?.stringValue || "N/A";
        const productDescription = product.fields.description?.stringValue || "N/A";

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `Name: ${productName}`;

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${productPrice}`;

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = `Description: ${productDescription}`;

        productDiv.appendChild(nameParagraph);
        productDiv.appendChild(priceParagraph);
        productDiv.appendChild(descriptionParagraph);

        productListDiv.appendChild(productDiv);
    });
}


// Fetch and display categories when the page loads
window.addEventListener('DOMContentLoaded', fetchAndDisplayCategories);
