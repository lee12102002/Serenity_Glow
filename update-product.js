// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {   addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Function to update description
// Function to update description
const updateProductDescription = async (productId, newDescription) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new description
        await updateDoc(docRef.ref, { description: newDescription });
        return true;
    } catch (error) {
        console.error("Error updating description:", error.message);
        return false;
    }
};

// Function to update quantity
const updateProductQuantity = async (productId, newQuantity) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new quantity
        await updateDoc(docRef.ref, { quantity: newQuantity });
        return true;
    } catch (error) {
        console.error("Error updating quantity:", error.message);
        return false;
    }
};

// Function to update title
const updateProductTitle = async (productId, newTitle) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new title
        await updateDoc(docRef.ref, { title: newTitle });
        return true;
    } catch (error) {
        console.error("Error updating title:", error.message);
        return false;
    }
};

// Function to update category ID
const updateProductCategoryId = async (productId, newCategoryId) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new category ID
        await updateDoc(docRef.ref, { categoryId: newCategoryId });
        return true;
    } catch (error) {
        console.error("Error updating category ID:", error.message);
        return false;
    }
};

// Export the functions


// Function to update price
// Function to update price based on product ID
const updateProductPriceByProductId = async (productId, newPrice) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new price
        await updateDoc(docRef.ref, { price: newPrice });
        return true;
    } catch (error) {
        console.error("Error updating price:", error.message);
        return false;
    }
};


// Export the functions
export { updateProductDescription, updateProductPriceByProductId, updateProductQuantity, updateProductTitle, updateProductCategoryId };

// Function to update product status to deactivated
const updateProductStatus = async (productId, status) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Update the document with the new status
        await updateDoc(docRef.ref, { status });
        return true;
    } catch (error) {
        console.error("Error updating product status:", error.message);
        return false;
    }
};

// Function to delete product by ID
const deleteProductById = async (productId) => {
    try {
        // Query Firestore to find the document ID associated with the provided product ID
        const querySnapshot = await getDocs(collection(db, 'Inventory'));
        const docRef = querySnapshot.docs.find(doc => doc.data().itemId === productId);

        if (!docRef) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Delete the document
        await deleteDoc(docRef.ref);
        return true;
    } catch (error) {
        console.error("Error deleting product:", error.message);
        return false;
    }
};
export{updateProductStatus,deleteProductById,addCreditLimitToUser};

const addCreditLimitToUser = async () => {
    const userEmail = prompt("Enter User Email:");
    const creditLimit = prompt("Enter Credit Limit:");
    try {
        // Query Firestore to find the document ID associated with the provided user email
        const querySnapshot = await getDocs(collection(db, 'Customer'));
        const docRef = querySnapshot.docs.find(doc => doc.data().email === userEmail);

        if (!docRef) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        // Update the document with the new credit limit
        await updateDoc(docRef.ref, { creditLimit: parseInt(creditLimit) });
        console.log("Credit limit added successfully");
    } catch (error) {
        console.error("Error adding credit limit:", error.message);
    }
};
// Import the necessary functions from the Firebase SDKs

// Function to add a new product to the Inventory collection
const addNewProduct = async (product) => {
    try {
        // Add a new document with a generated ID to the Inventory collection
        await addDoc(collection(db, 'Inventory'), product);
        return true;
    } catch (error) {
        console.error("Error adding new product:", error.message);
        return false;
    }
};

// Export the function
export { addNewProduct };
