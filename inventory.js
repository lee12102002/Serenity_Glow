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
// Function to fetch all products
const fetchAllProducts = async () => {
    try {
        const response = await fetch("https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents/Inventory");
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        return data.documents.map(doc => ({
            id: doc.name,
            title: doc.fields.title.stringValue,
            description: doc.fields.description.stringValue,
            price: doc.fields.price.integerValue,
            quantity: doc.fields.quantity.integerValue,
            categoryId: doc.fields.categoryId.stringValue
        }));
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
};

// Function to fetch products by category
const fetchProductsByCategory = async (category) => {
    try {
        const query = {
            structuredQuery: {
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'categoryId' },
                        op: 'EQUAL',
                        value: { stringValue: category }
                    }
                },
                from: [{ collectionId: 'Inventory' }]
            }
        };

        const response = await fetch(`https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents:runQuery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products by category");
        }

        const data = await response.json();

        return data.map(doc => ({
            id: doc.document.name,
            title: doc.document.fields.title.stringValue,
            description: doc.document.fields.description.stringValue,
            price: doc.document.fields.price.integerValue,
            quantity: doc.document.fields.quantity.integerValue,
            categoryId: doc.document.fields.categoryId.stringValue
        }));
    } catch (error) {
        console.error("Error fetching products by category:", error.message);
        return [];
    }
};


// Function to fetch product by ID
const fetchProductById = async (itemId) => {
    try {
        const query = {
            structuredQuery: {
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'itemId' },
                        op: 'EQUAL',
                        value: { stringValue: itemId }
                    }
                },
                from: [{ collectionId: 'Inventory' }]
            }
        };

        const response = await fetch(`https://firestore.googleapis.com/v1/projects/newlogin-5ed37/databases/(default)/documents:runQuery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product by ID");
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const doc = data[0].document;
            return {
                id: doc.name,
                title: doc.fields.title.stringValue,
                description: doc.fields.description.stringValue,
                price: doc.fields.price.integerValue,
                quantity: doc.fields.quantity.integerValue,
                categoryId: doc.fields.categoryId.stringValue
            };
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        return null;
    }
};

// Export functions
export { fetchAllProducts, fetchProductsByCategory, fetchProductById };


