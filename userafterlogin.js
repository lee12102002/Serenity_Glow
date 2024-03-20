// Import Firebase SDK and initialize Firebase
import { initializeApp } from 'firebase/app';


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
  const db = firebase.firestore();
  
  // Function to display user profile details
  async function displayUserProfile(user) {
    try {
      const userProfile = await db.collection('Customer').doc(user.uid).get();
      const userData = userProfile.data();
      const profileSection = document.getElementById('profile');
      profileSection.innerHTML = `
        <h2>User Profile</h2>
        <p><strong>Name:</strong> ${userData.fullName}</p>
        <p><strong>Contact:</strong> ${userData.contact}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Credit Balance:</strong> ${userData.credit}</p>
      `;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
  
  // Function to fetch user's cart items from Firestore

  
  // Function to handle cart management (add, update, remove items)
  async function manageCart(userId, itemId, quantity) {
    try {
      // Check if item already exists in user's cart
      const userCartRef = await db.collection('Cart').where('userId', '==', userId).where('itemId', '==', itemId).get();
      if (!userCartRef.empty) {
        // Update quantity if item exists
        const cartItem = userCartRef.docs[0];
        await cartItem.ref.update({ quantity: quantity });
      } else {
        // Add new item to cart if not already present
        await db.collection('Cart').add({
          userId: userId,
          itemId: itemId,
          quantity: quantity
        });
      }
      // Fetch updated cart items
      await fetchUserCart(userId);
    } catch (error) {
      console.error('Error managing cart:', error);
    }
  }
  
  // Function to handle checkout process and purchase functionality
  async function checkout(userId) {
    try {
      // Fetch user's cart items
      const userCartRef = await db.collection('Cart').where('userId', '==', userId).get();
      // Calculate total price
      let totalPrice = 0;
      userCartRef.forEach(doc => {
        const item = doc.data();
        totalPrice += item.price * item.quantity;
      });
      // Fetch user details
      const userProfile = await db.collection('Customer').doc(userId).get();
      const userData = userProfile.data();
      // Check if user has sufficient credit
      if (userData.credit >= totalPrice) {
        // Deduct total price from user's credit balance
        await userProfile.ref.update({ credit: userData.credit - totalPrice });
        // Update inventory quantity and clear user's cart
        const batch = db.batch();
        userCartRef.forEach(doc => {
          const cartItem = doc.data();
          const inventoryRef = db.collection('Inventory').doc(cartItem.itemId);
          batch.update(inventoryRef, { quantity: firebase.firestore.FieldValue.increment(-cartItem.quantity) });
          doc.ref.delete();
        });
        await batch.commit();
        // Fetch updated cart items
        await fetchUserCart(userId);
        alert('Purchase successful!');
      } else {
        alert('Insufficient credit balance!');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }
  
  // Execute functions upon page load
  document.addEventListener('DOMContentLoaded', async function() {
    // Check user authentication status
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        // User is signed in
        // Display user profile and cart
        await displayUserProfile(user);
        await fetchUserCart(user.uid);
        // Implement cart management and purchase functionality
        document.getElementById('manageCartBtn').addEventListener('click', function() {
          const itemId = document.getElementById('itemId').value;
          const quantity = parseInt(document.getElementById('quantity').value);
          manageCart(user.uid, itemId, quantity);
        });
        document.getElementById('checkoutBtn').addEventListener('click', function() {
          checkout(user.uid);
        });
      } else {
        // User is signed out
        console.log('User is signed out');
        // Redirect to login page or handle as needed
      }
    });
  });
  // Function to fetch user's cart items from Firestore
// async function fetchUserCart(userId) {
//     try {
//         // Fetch user's cart items based on their user ID from Firestore
//         const cartRef = collection(db, 'Cart');
//         const querySnapshot = await getDocs(cartRef);

//         // Initialize an empty array to store cart items
//         const cartItems = [];

//         // Iterate over the cart items and push them to the cartItems array
//         querySnapshot.forEach((doc) => {
//             const cartItem = doc.data();
//             if (cartItem.userId === userId) {
//                 cartItems.push(cartItem);
//             }
//         });

//         // Display cart items in the cart section
//         displayCart(cartItems);
//     } catch (error) {
//         console.error("Error fetching user's cart:", error);
//     }
// }

async function fetchUserCart(userId) {
  try {
    const userCartRef = await db.collection('Cart').where('userId', '==', userId).get();
    const cartItems = [];
    userCartRef.forEach(doc => {
      cartItems.push(doc.data());
    });
    const cartSection = document.getElementById('cart');
    cartSection.innerHTML = '<h2>Cart Items</h2>';
    cartItems.forEach(item => {
      cartSection.innerHTML += `
        <div>
          <p><strong>Item:</strong> ${item.itemId}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Price:</strong> ${item.price}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching user cart:', error);
  }
}


// Function to display cart items in the cart section
function displayCart(cartItems) {
    const cartSection = document.getElementById('cart');

    // Clear previous cart items
    cartSection.innerHTML = '';

    // Display cart items
    cartItems.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Create elements to display cart item details
        const productName = document.createElement('p');
        productName.textContent = `Product: ${cartItem.productName}`;

        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${cartItem.quantity}`;

        const price = document.createElement('p');
        price.textContent = `Price: ${cartItem.price}`;

        // Append cart item details to the cart item div
        cartItemDiv.appendChild(productName);
        cartItemDiv.appendChild(quantity);
        cartItemDiv.appendChild(price);

        // Append cart item div to the cart section
        cartSection.appendChild(cartItemDiv);
    });
}

// Function to update the cart
// Function to update the cart in Firestore
async function updateCart(userId, productId, quantity) {
  try {
      // Check if the cart item already exists for the user and product
      const cartRef = db.collection('Cart').where('userId', '==', userId).where('productId', '==', productId);
      const snapshot = await cartRef.get();
      
      if (snapshot.empty) {
          // If the cart item doesn't exist, create a new document
          await db.collection('Cart').add({
              userId: userId,
              productId: productId,
              quantity: quantity
          });
      } else {
          // If the cart item exists, update its quantity
          const docId = snapshot.docs[0].id;
          await db.collection('Cart').doc(docId).update({ quantity: quantity });
      }
      
      console.log('Cart updated successfully!');
  } catch (error) {
      console.error('Error updating cart:', error);
  }
}

// Implement cart management and purchase functionality
document.getElementById('manageCartBtn').addEventListener('click', function() {
  const itemId = document.getElementById('itemId').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  manageCart(user.uid, itemId, quantity);
  
  // Call updateCart function to update the cart in Firestore
  updateCart(user.uid, itemId, quantity);
});

// Call displayCart function to fetch and display the user's cart items when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  // Replace 'userId' with the actual user ID obtained after login
  const userId = 'userId'; // Replace with actual user ID
  displayCart(userId);
});


// Fetch and display the user's cart when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Replace 'userId' with the actual user ID obtained after login
    const userId = 'userId'; // Replace with actual user ID
    fetchUserCart(userId);
});

  